"use client"

import { useStore } from "@/lib/store/use-store"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Circle, Clock, Loader2 } from "lucide-react"
import { useState } from "react"
import { Task } from "@/types/supabase"

export function ChildTaskList() {
    const { tasks, updateTaskStatus } = useStore()
    const [loadingId, setLoadingId] = useState<string | null>(null)

    // Filter tasks for the child (logic already in fetchTasks but double check status)
    // We want to show 'pending' tasks mostly. 'completed' ones are waiting for approval.
    // 'approved' ones might move to a history tab or disappear.
    const activeTasks = tasks.filter(t => t.status === 'pending')
    const waitingApprovalTasks = tasks.filter(t => t.status === 'completed')

    import confetti from "canvas-confetti"

    // ...

    const handleComplete = async (taskId: string) => {
        setLoadingId(taskId)
        // Fire confetti from the center-bottom
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.8 },
            colors: ['#34d399', '#fbbf24', '#ffffff']
        })
        await updateTaskStatus(taskId, 'completed')
        setLoadingId(null)
    }

    if (activeTasks.length === 0 && waitingApprovalTasks.length === 0) {
        return (
            <Card className="p-6 text-center border-dashed border-2 border-slate-200 bg-slate-50 rounded-3xl">
                <p className="text-slate-500 font-bold">Henüz bir görevin yok! 🎉</p>
                <p className="text-xs text-slate-400 mt-1">Keyfine bak.</p>
            </Card>
        )
    }

    return (
        <div className="space-y-4">
            <h3 className="font-black text-xl text-slate-800 px-2">Görevlerim 📝</h3>

            {/* Active Tasks */}
            {activeTasks.map((task) => (
                <Card key={task.id} className="p-4 flex items-center justify-between bg-white border-2 border-slate-100 shadow-sm rounded-2xl hover:border-emerald-200 transition-colors group">
                    <div className="flex items-center gap-3">
                        <div className="bg-emerald-100 p-2 rounded-xl text-emerald-600">
                            {/* Icon based on task? For now static */}
                            <CheckCircle size={24} />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900">{task.title}</p>
                            <p className="text-xs text-slate-500 font-bold bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-1 text-emerald-700">
                                +{task.reward_amount} TL
                            </p>
                        </div>
                    </div>

                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-12 w-12 rounded-full border-2 border-slate-200 text-slate-300 hover:text-emerald-500 hover:border-emerald-500 hover:bg-emerald-50"
                        onClick={() => handleComplete(task.id)}
                        disabled={loadingId === task.id}
                    >
                        {loadingId === task.id ? <Loader2 className="animate-spin" /> : <Circle size={28} className="stroke-[3]" />}
                    </Button>
                </Card>
            ))}

            {/* Waiting Approval */}
            {waitingApprovalTasks.length > 0 && (
                <div className="pt-4">
                    <h4 className="text-sm font-bold text-slate-400 px-2 mb-2 uppercase tracking-wider">Onay Bekleyenler</h4>
                    <div className="space-y-2 opacity-60">
                        {waitingApprovalTasks.map((task) => (
                            <div key={task.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <Clock size={20} className="text-amber-500" />
                                <span className="font-medium text-slate-600 line-through decoration-slate-300">{task.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
