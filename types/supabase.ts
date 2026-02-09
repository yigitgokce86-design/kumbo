export type ProfileRole = 'parent' | 'child'
export type TaskStatus = 'pending' | 'completed' | 'approved' | 'rejected'

export interface Profile {
    id: string
    username: string
    full_name: string
    avatar_url: string
    role: ProfileRole
    family_id: string | null
    cash_balance: number
    digital_balance: number
    xp: number
}

export interface Family {
    id: string
    name: string
    invite_code: string
    members?: Profile[]
}

export interface Task {
    id: string
    title: string
    description?: string
    reward_amount: number
    status: TaskStatus
    assigned_to: string // Child ID
    created_by: string // Parent ID
    proof_image_url?: string
}

export interface Goal {
    id: string
    title: string
    target_amount: number
    current_amount: number
    image_url: string
    status: 'active' | 'completed'
    owner_id: string // Who owns this goal
}
