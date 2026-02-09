import { create } from 'zustand'
import { createClient } from '@/lib/supabase/client'
import { Badge, MOCK_BADGES } from '@/lib/content-data'
import { Profile, Family, Task, Goal } from '@/types/supabase'

interface StoreState {
    user: Profile | null
    family: Family | null
    activeChild: Profile | null
    goals: Goal[]
    tasks: Task[]
    isLoading: boolean

    // Learning Progress
    xp: number
    completedLessons: string[]
    badges: Badge[]

    // Actions
    fetchUser: () => Promise<void>
    fetchFamily: () => Promise<void>
    setActiveChild: (childId: string) => void

    // Goal Actions
    fetchGoals: (userId?: string) => Promise<void>
    addMoney: (goalId: string, amount: number, description?: string) => Promise<void>

    // Task Actions
    fetchTasks: () => Promise<void>
    createTask: (title: string, reward: number, assignedTo: string) => Promise<void>
    updateTaskStatus: (taskId: string, status: Task['status']) => Promise<void>
    approveAllTasks: (childId: string) => Promise<void>
    addGoal: (title: string, amount: number) => Promise<void>
    setUser: (user: Profile | null) => void

    // Badge Actions
    fetchBadges: () => Promise<void>
    checkBadges: () => Promise<void>
    completeLesson: (lessonId: string, xpReward: number) => Promise<void>

    logout: () => Promise<void>
}

export const useStore = create<StoreState>((set, get) => ({
    user: null,
    family: null,
    activeChild: null,
    goals: [],
    tasks: [],
    isLoading: false,

    xp: 0,
    completedLessons: [],
    badges: MOCK_BADGES,

    setUser: (user) => set({ user }),

    fetchUser: async () => {
        const supabase = createClient()
        const { data: { user: authUser } } = await supabase.auth.getUser()

        if (authUser) {
            const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', authUser.id)
                .single()

            if (profile) {
                set({
                    user: profile as Profile,
                    xp: profile.xp || 0
                })

                if (profile.family_id) {
                    get().fetchFamily()
                }
                get().fetchBadges()
            }
        }
    },

    fetchFamily: async () => {
        const supabase = createClient()
        const { user } = get()
        if (!user?.family_id) return

        const { data: family } = await supabase
            .from('families')
            .select('*')
            .eq('id', user.family_id)
            .single()

        const { data: members } = await supabase
            .from('profiles')
            .select('*')
            .eq('family_id', user.family_id)

        if (family) {
            const fullFamily: Family = {
                ...family,
                members: members as Profile[] || []
            }

            set({ family: fullFamily })

            if (user.role === 'parent' && members) {
                const firstChild = members.find(m => m.role === 'child')
                if (firstChild) set({ activeChild: firstChild })
            }
        }
    },

    setActiveChild: (childId) => {
        const { family } = get()
        const child = family?.members?.find(m => m.id === childId)
        if (child) {
            set({ activeChild: child })
            get().fetchGoals(child.id)
            get().fetchTasks()
        }
    },

    createTask: async (title: string, reward: number, assignedTo: string) => {
        const supabase = createClient()
        const { user } = get()
        if (!user) return

        const newTask = {
            title,
            reward_amount: reward,
            assigned_to: assignedTo,
            created_by: user.id,
            family_id: user.family_id,
            status: 'pending'
        }

        try {
            const { data, error } = await supabase
                .from('tasks')
                .insert(newTask)
                .select()
                .single()

            if (error) throw error

            set(state => ({
                tasks: [data as Task, ...state.tasks]
            }))
        } catch (error) {
            console.error('Error creating task:', error)
        }
    },

    updateTaskStatus: async (taskId, status) => {
        const supabase = createClient()
        const { tasks, activeChild } = get()

        // Optimistic update
        set(state => ({
            tasks: state.tasks.map(t => t.id === taskId ? { ...t, status } : t)
        }))

        try {
            const { error } = await supabase.from('tasks').update({ status }).eq('id', taskId)
            if (error) throw error

            // 1. Auto-Pay on Approval
            if (status === 'approved') {
                const task = tasks.find(t => t.id === taskId)
                if (task && activeChild && activeChild.id === task.assigned_to) {
                    // Add money to digital balance via transaction
                    const { error: txError } = await supabase.from('transactions').insert({
                        user_id: activeChild.id,
                        amount: task.reward_amount,
                        type: 'task_reward',
                        description: `Görev Ödülü: ${task.title}`
                    })

                    if (txError) throw txError

                    const { error: profileError } = await supabase.rpc('increment_balance', {
                        user_id: activeChild.id,
                        amount: task.reward_amount
                    })

                    if (profileError) throw profileError

                    // Optimistic update for activeChild balance
                    set(state => ({
                        activeChild: state.activeChild ? {
                            ...state.activeChild,
                            digital_balance: state.activeChild.digital_balance + task.reward_amount
                        } : null
                    }))
                }
            }

        } catch (err) {
            console.error("Error updating task:", err)
            get().fetchTasks() // Revert/Refresh on error
        }
    },

    fetchTasks: async () => {
        const supabase = createClient()
        const { user, activeChild } = get()
        if (!user) return

        let query = supabase.from('tasks').select('*')

        if (user.role === 'parent' && activeChild) {
            query = query.eq('assigned_to', activeChild.id)
        } else if (user.role === 'child') {
            query = query.eq('assigned_to', user.id)
        } else {
            set({ tasks: [] })
            return
        }

        const { data, error } = await query.order('created_at', { ascending: false })

        if (!error && data) {
            set({ tasks: data as Task[] })
        }
    },

    fetchBadges: async () => {
        const supabase = createClient()
        const { user, badges } = get()
        if (!user) return

        const { data: earnedBadges } = await supabase
            .from('user_badges')
            .select('badge_id')
            .eq('user_id', user.id)

        if (earnedBadges) {
            const earnedIds = earnedBadges.map(b => b.badge_id)
            const updatedBadges = badges.map(b => ({
                ...b,
                isEarned: earnedIds.includes(b.id)
            }))
            // @ts-ignore
            set({ badges: updatedBadges })
        }
    },

    checkBadges: async () => {
        const { user, goals, completedLessons, badges } = get()
        if (!user) return

        const supabase = createClient()
        const newEarnedBadges: string[] = []

        const checks = [
            { id: 'first-step', condition: goals.length > 0 },
            { id: 'saver', condition: goals.some(g => g.current_amount > 0) },
            { id: 'bookworm', condition: completedLessons.length >= 5 },
            { id: 'champion', condition: goals.some(g => g.status === 'completed') }
        ]

        for (const check of checks) {
            const badge = badges.find(b => b.id === check.id)
            if (badge && !badge.isEarned && check.condition) {
                newEarnedBadges.push(check.id)
                await supabase.from('user_badges').insert({
                    user_id: user.id,
                    badge_id: check.id
                })
                await supabase.rpc('increment_xp', { x: badge.xpReward })
                set(state => ({ xp: state.xp + badge.xpReward }))
            }
        }

        if (newEarnedBadges.length > 0) {
            get().fetchBadges()
        }
    },

    completeLesson: async (lessonId, xpReward) => {
        const { completedLessons, xp, user } = get()
        if (!user) return
        if (completedLessons.includes(lessonId)) return

        set({
            completedLessons: [...completedLessons, lessonId],
            xp: xp + xpReward
        })

        const supabase = createClient()
        await supabase.from('user_lesson_progress').insert({
            user_id: user.id,
            lesson_id: lessonId,
            status: 'completed'
        })

        await supabase.rpc('increment_xp', { x: xpReward })
        get().checkBadges()
    },

    fetchGoals: async (userId) => {
        set({ isLoading: true })
        const supabase = createClient()
        const { user, activeChild } = get()

        const targetUserId = userId || (user?.role === 'parent' ? activeChild?.id : user?.id)
        if (!targetUserId) return

        try {
            const { data, error } = await supabase
                .from('goals')
                .select('*')
                .eq('owner_id', targetUserId)
                .order('created_at', { ascending: false })

            if (error) throw error

            const mappedGoals: Goal[] = (data || []).map(g => ({
                id: g.id,
                title: g.title,
                target_amount: Number(g.target_amount),
                current_amount: Number(g.current_amount),
                image_url: g.image_url || '/assets/placeholder.png',
                status: g.status,
                owner_id: g.owner_id
            }))

            set({ goals: mappedGoals })
            get().checkBadges()
        } catch (error) {
            console.error('Error fetching goals:', error)
        } finally {
            set({ isLoading: false })
        }
    },

    addMoney: async (goalId, amount, description = 'Hızlı Ekleme') => {
        const supabase = createClient()
        const user = get().user
        if (!user) return

        set(state => ({
            goals: state.goals.map(g =>
                g.id === goalId
                    ? { ...g, current_amount: g.current_amount + amount }
                    : g
            ),
            xp: state.xp + 10
        }))

        try {
            const { error: txError } = await supabase
                .from('transactions')
                .insert({
                    user_id: user.id,
                    goal_id: goalId,
                    amount: amount,
                    type: 'deposit',
                    description: description
                })

            if (txError) throw txError

            await supabase.rpc('update_goal_amount', {
                goal_id: goalId,
                amount_to_add: amount
            })

            await supabase.rpc('increment_xp', { x: 10 })
            get().checkBadges()

        } catch (error) {
            console.error("Error adding money:", error)
            get().fetchGoals()
        }
    },

    addGoal: async (title: string, targetAmount: number) => {
        const { user } = get()
        if (!user) return
        const supabase = createClient()

        try {
            const { data, error } = await supabase
                .from('goals')
                .insert({
                    owner_id: user.id, // Assuming user creates for self (child) or self (adult)
                    title,
                    target_amount: targetAmount,
                    current_amount: 0,
                    status: 'active'
                })
                .select()
                .single()

            if (error) throw error

            if (data) {
                // @ts-ignore
                set(state => ({ goals: [data as Goal, ...state.goals] }))
            }
        } catch (err) {
            console.error("Add Goal Error:", err)
        }
    },

    approveAllTasks: async (childId: string) => {
        const { tasks, user } = get()
        if (!user || user.role !== 'parent') return
        const supabase = createClient()

        const pendingTasks = tasks.filter(t => t.assigned_to === childId && t.status === 'completed')
        if (pendingTasks.length === 0) return

        // Optimistic Update
        set(state => ({
            tasks: state.tasks.map(t =>
                (t.assigned_to === childId && t.status === 'completed')
                    ? { ...t, status: 'approved' }
                    : t
            )
        }))

        try {
            const taskIds = pendingTasks.map(t => t.id)
            const { error: updateError } = await supabase
                .from('tasks')
                .update({ status: 'approved' })
                .in('id', taskIds)

            if (updateError) throw updateError

            await Promise.all(pendingTasks.map(async (task) => {
                await supabase.from('transactions').insert({
                    user_id: childId,
                    amount: task.reward_amount,
                    type: 'task_reward',
                    description: `Toplu Onay: ${task.title}`
                })
                await supabase.rpc('increment_balance', {
                    user_id: childId,
                    amount: task.reward_amount
                })
            }))

            const totalReward = pendingTasks.reduce((sum, t) => sum + t.reward_amount, 0)
            set(state => ({
                activeChild: state.activeChild ? {
                    ...state.activeChild,
                    digital_balance: state.activeChild.digital_balance + totalReward
                } : null
            }))

        } catch (error) {
            console.error("Bulk Approve Error:", error)
            get().fetchTasks()
        }
    },

    logout: async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        set({ user: null, goals: [], family: null, activeChild: null })
    }
}))
