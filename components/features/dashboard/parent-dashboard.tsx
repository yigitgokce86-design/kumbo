"use client"
import { useStore } from "@/lib/store/use-store"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Users, CheckCircle, Wallet, Banknote } from "lucide-react"
import { TaskApprovalList } from "./task-approval-list"
import { CreateTaskModal } from "./create-task-modal"
import { TransactionHistoryList } from "./transaction-history-list"
import { BalanceAdjustmentModal } from "./balance-adjustment-modal"

export default function FamilyDashboard() {
    const { user, family, activeChild, setActiveChild } = useStore()

    useEffect(() => {
        // Assume fetchFamily already called on load
    }, [])

    if (!user || user.role !== 'parent') return <div>Access Denied</div>

    return (
        <div className="space-y-6 pt-6">
            <h1 className="text-2xl font-bold">Aile Yönetimi 👨‍👩‍👧‍👦</h1>

            {/* Child Selector */}
            <div className="flex gap-4 overflow-x-auto pb-2">
                {family?.members?.filter(m => m.role === 'child').map(child => (
                    <button
                        key={child.id}
                        onClick={() => setActiveChild(child.id)}
                        className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${activeChild?.id === child.id
                            ? 'border-emerald-500 bg-emerald-50 shadow-md'
                            : 'border-slate-200 hover:bg-slate-50'
                            }`}
                    >
                        <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                            {/* Placeholder Avatar */}
                            <img src={child.avatar_url || '/assets/avatar-placeholder.png'} alt={child.full_name} />
                        </div>
                        <div className="text-left">
                            <p className="font-bold text-sm">{child.full_name}</p>
                            <p className="text-xs text-slate-500">{child.username}</p>
                        </div>
                    </button>
                ))}
            </div>

            {/* Active Child Overview */}
            {activeChild && (
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <Card className="p-4 border-emerald-100 bg-white shadow-sm">
                            <div className="flex items-center gap-2 mb-2 text-emerald-700">
                                <Wallet size={20} />
                                <span className="font-bold text-sm">Toplam Bakiye</span>
                            </div>
                            <p className="text-3xl font-black text-emerald-900">
                                {(activeChild.cash_balance + activeChild.digital_balance).toFixed(2)} TL
                            </p>
                            <p className="text-xs text-emerald-600 mt-1">
                                {activeChild.cash_balance} TL (Nakit) + {activeChild.digital_balance} TL (Dijital)
                            </p>
                        </Card>

                        <Card className="p-4 border-amber-100 bg-white shadow-sm flex flex-col justify-center items-center text-center">
                            <div className="text-amber-500 mb-1">
                                <CheckCircle size={32} />
                            </div>
                            <span className="font-bold text-amber-900 text-sm">Görev Durumu</span>
                            <p className="text-xs text-amber-600 mt-1">Bekleyenleri aşağıdan onaylayabilirsin.</p>
                        </Card>
                    </div>

                    {/* Actions Row */}
                    <div className="grid grid-cols-1">
                        <CreateTaskModal />
                    </div>

                    {/* Approval List */}
                    <TaskApprovalList />
                </div>
            )}
        </div>
    )
}
