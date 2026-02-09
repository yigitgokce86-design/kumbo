"use client"

import { useStore } from "@/lib/store/use-store"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Clock, Check, Banknote, History } from "lucide-react"
import { Task } from "@/types/supabase"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TaskApprovalList() {
    const { tasks, updateTaskStatus, approveAllTasks, activeChild } = useStore()
    const [isApprovingAll, setIsApprovingAll] = useState(false)

    if (!activeChild) return null

    // Pending: 'completed' status
    const pendingTasks = tasks.filter(t => t.status === 'completed')
    // History: 'approved' or 'rejected' (Last 5)
    const historyTasks = tasks.filter(t => t.status === 'approved' || t.status === 'rejected').slice(0, 5)

    const totalPendingAmount = pendingTasks.reduce((sum, t) => sum + t.reward_amount, 0)

    const handleApprove = async (task: Task) => {
        await updateTaskStatus(task.id, 'approved')
    }

    const handleReject = async (task: Task) => {
        await updateTaskStatus(task.id, 'rejected')
    }

    const handleApproveAll = async () => {
        setIsApprovingAll(true)
        await approveAllTasks(activeChild.id)
        setIsApprovingAll(false)
    }

    return (
        <Card className="p-6 border-slate-200 bg-white shadow-sm space-y-6">
            <Tabs defaultValue="pending" className="w-full">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                        <CheckCircle className="text-emerald-500" size={24} />
                        Görev Onayları
                    </h3>
                    <TabsList className="bg-slate-100 p-1 rounded-xl">
                        <TabsTrigger value="pending" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs font-bold px-3">Bekleyen</TabsTrigger>
                        <TabsTrigger value="history" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs font-bold px-3">Geçmiş</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="pending" className="space-y-4 animate-in slide-in-from-left-2 duration-300">
                    {pendingTasks.length === 0 ? (
                        <div className="text-center py-8 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-100">
                            <Clock className="mx-auto text-slate-300 mb-2" size={32} />
                            <p className="text-slate-500 font-medium">Onay bekleyen görev yok.</p>
                            <p className="text-xs text-slate-400">Çocuğunuz görevleri tamamladığında burada görünecek.</p>
                        </div>
                    ) : (
                        <>
                            {/* Summary Card */}
                            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-4 text-white flex items-center justify-between shadow-lg shadow-emerald-200">
                                <div>
                                    <p className="text-emerald-100 text-xs font-bold uppercase tracking-wider">Ödenecek Tutar</p>
                                    <p className="text-3xl font-black">{totalPendingAmount} <span className="text-lg font-bold">TL</span></p>
                                    <p className="text-xs text-emerald-100 opacity-80 mt-1">{pendingTasks.length} görev tamamlandı</p>
                                </div>
                                <Button
                                    onClick={handleApproveAll}
                                    disabled={isApprovingAll}
                                    className="bg-white text-emerald-600 hover:bg-emerald-50 font-black px-4 py-6 rounded-xl shadow-md border-b-4 border-emerald-800/10 active:border-b-0 active:translate-y-1 transition-all"
                                >
                                    {isApprovingAll ? "İşleniyor..." : "Tümünü Öde"}
                                </Button>
                            </div>

                            {/* List */}
                            <div className="space-y-2">
                                {pendingTasks.map((task) => (
                                    <div key={task.id} className="p-3 flex items-center justify-between bg-white border-2 border-slate-100 rounded-xl hover:border-emerald-100 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
                                                <Clock size={20} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800 text-sm">{task.title}</p>
                                                <p className="text-xs text-emerald-600 font-bold bg-emerald-50 inline-block px-1.5 rounded mt-0.5">+{task.reward_amount} TL</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-9 w-9 rounded-full text-red-400 hover:text-red-500 hover:bg-red-50"
                                                onClick={() => handleReject(task)}
                                            >
                                                <XCircle size={20} />
                                            </Button>
                                            <Button
                                                size="icon"
                                                className="h-9 w-9 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm"
                                                onClick={() => handleApprove(task)}
                                            >
                                                <Check size={18} strokeWidth={3} />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </TabsContent>

                <TabsContent value="history" className="space-y-4 animate-in slide-in-from-right-2 duration-300">
                    {historyTasks.length === 0 ? (
                        <div className="text-center py-6 text-slate-400 text-sm">Henüz geçmiş kayıt yok.</div>
                    ) : (
                        <div className="space-y-2">
                            {historyTasks.map((task) => (
                                <div key={task.id} className="p-3 flex items-center justify-between bg-slate-50 border border-slate-100 rounded-xl opacity-70 hover:opacity-100 transition-opacity">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${task.status === 'approved' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                                            {task.status === 'approved' ? <CheckCircle size={18} /> : <XCircle size={18} />}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-700 text-sm line-through decoration-slate-300">{task.title}</p>
                                            <p className="text-xs text-slate-400">{new Date(task.created_at || '').toLocaleDateString('tr-TR')}</p>
                                        </div>
                                    </div>
                                    <span className={`text-sm font-bold ${task.status === 'approved' ? 'text-emerald-600' : 'text-red-400'}`}>
                                        {task.status === 'approved' ? `+${task.reward_amount} TL` : 'Reddedildi'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </Card>
    )
}
