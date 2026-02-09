"use client"

import { useEffect, useState } from "react"
import { useStore } from "@/lib/store/use-store"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Character } from "@/components/ui/character"
import { Plus, Target } from "lucide-react"
import { TransactionModal } from "@/components/features/dashboard/transaction-modal"
import FamilyDashboard from "@/components/features/dashboard/parent-dashboard"
import { ChildTaskList } from "@/components/features/dashboard/child-task-list"

export default function DashboardPage() {
    const { user, goals, fetchGoals } = useStore()
    const [isModalOpen, setIsModalOpen] = useState(false)

    // For demo, we use the first goal if available
    const activeGoal = goals[0]

    useEffect(() => {
        fetchGoals()
    }, [])

    if (!user) return <div className="p-8 text-center">Yükleniyor...</div>

    // 1. Role Check: If Parent, show Parent Dashboard
    if (user.role === 'parent') {
        return <FamilyDashboard />
    }

    // 2. Default: Child Dashboard
    return (
        <div className="flex flex-col gap-6 p-4 pb-24">

            {/* Header / Welcome */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-emerald-900 -tracking-wide">Selam, {user.username || "Kaşif"}! 👋</h1>
                    <p className="text-emerald-700 font-medium">Bugün birikim yapmaya hazır mısın?</p>
                </div>
                <div className="bg-white p-2 rounded-2xl shadow-sm border-2 border-emerald-100">
                    <span className="text-xl font-bold text-amber-500">🔥 {user.xp > 0 ? Math.floor(user.xp / 100) : 0}</span>
                </div>
            </div>

            {/* Goal Card (Main Focus) */}
            <Card className="bg-white border-4 border-emerald-100 text-emerald-900 p-6 rounded-[2rem] relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 p-4 opacity-5 text-emerald-900">
                    <Target size={140} />
                </div>

                <div className="relative z-10 space-y-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-emerald-600 text-sm font-bold uppercase tracking-wider">Hedefim</p>
                            <h2 className="text-4xl font-black text-emerald-950 mt-1">{activeGoal?.title || "Hedef Belirle"}</h2>
                        </div>
                        <div className="bg-emerald-100 px-4 py-2 rounded-2xl text-emerald-800 font-black text-lg">
                            {activeGoal && activeGoal.target_amount > 0
                                ? Math.round((activeGoal.current_amount / activeGoal.target_amount) * 100)
                                : 0}%
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-base font-bold text-emerald-800">
                            <span>{activeGoal?.current_amount || 0} TL</span>
                            <span className="text-emerald-400">{activeGoal?.target_amount || 0} TL</span>
                        </div>
                        <div className="h-5 w-full bg-emerald-50 rounded-full overflow-hidden border border-emerald-100">
                            <div
                                className="h-full bg-emerald-400 rounded-full shadow-[0_2px_10px_rgba(52,211,153,0.4)] transition-all duration-1000"
                                style={{ width: `${activeGoal && activeGoal.target_amount > 0 ? (activeGoal.current_amount / activeGoal.target_amount) * 100 : 0}%` }}
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button
                            className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-black text-xl rounded-2xl h-16 shadow-[0_6px_0_0_#059669] active:shadow-none active:translate-y-[6px] transition-all"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <Plus className="mr-2 h-7 w-7 stroke-[3]" /> Para Ekle
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Character Guidance */}
            <div className="bg-white border-2 border-emerald-100 rounded-3xl p-5 shadow-sm flex items-center gap-4 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-emerald-50/50 to-transparent pointer-events-none" />
                <div className="shrink-0 text-emerald-600">
                    <Character variant="guide" size="sm" />
                </div>
                <div className="flex-1 relative z-10">
                    <p className="text-emerald-800 font-bold leading-tight">
                        {activeGoal ? "Harika gidiyorsun! Hedefine ulaşmana çok az kaldı." : "Hadi kendine bir hedef belirle!"}
                    </p>
                </div>
            </div>

            {/* Tasks Section */}
            <ChildTaskList />


            <TransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />


        </div>
    )
}
