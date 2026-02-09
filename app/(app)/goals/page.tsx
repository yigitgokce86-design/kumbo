"use client"

import { useStore } from "@/lib/store/use-store"
import { Shell } from "@/components/layout/shell"
import { GoalCard } from "@/components/features/goals/goal-card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function GoalsPage() {
    const { goals, user } = useStore()

    // Calculate total savings
    const totalSavings = goals.reduce((acc, goal) => acc + goal.current_amount, 0)

    return (
        <Shell>
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Hedeflerim</h1>
                        <p className="text-muted-foreground">
                            {user ? `Merhaba ${user.full_name || user.username}, ` : ''}Toplam birikimin: <span className="text-primary font-bold text-lg">₺{totalSavings}</span>
                        </p>
                    </div>
                    <Button variant="premium">
                        <PlusCircle className="mr-2 h-4 w-4" /> Yeni Hedef
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {goals.map(goal => (
                        <GoalCard key={goal.id} goal={goal} />
                    ))}
                </div>
            </div>
        </Shell>
    )
}
