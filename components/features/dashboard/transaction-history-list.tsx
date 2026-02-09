"use client"

import { useStore } from "@/lib/store/use-store"
import { Card } from "@/components/ui/card"
import { ArrowDownLeft, ArrowUpRight, History } from "lucide-react"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

interface Transaction {
    id: string
    created_at: string
    amount: number
    type: 'deposit' | 'task_reward' | 'withdrawal'
    description: string
}

export function TransactionHistoryList() {
    const { activeChild } = useStore()
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!activeChild) return

        const fetchTransactions = async () => {
            setLoading(true)
            const supabase = createClient()
            const { data } = await supabase
                .from('transactions')
                .select('*')
                .eq('user_id', activeChild.id)
                .order('created_at', { ascending: false })
                .limit(10)

            if (data) setTransactions(data as Transaction[])
            setLoading(false)
        }

        fetchTransactions()
    }, [activeChild])

    if (!activeChild) return null

    return (
        <Card className="p-6 border-slate-200 bg-white shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                <History className="text-slate-400" size={24} />
                Son Hareketler
            </h3>

            {loading ? (
                <div className="text-center py-4 text-slate-400">Yükleniyor...</div>
            ) : transactions.length === 0 ? (
                <div className="text-center py-6 text-slate-400 text-sm">Henüz işlem yok.</div>
            ) : (
                <div className="space-y-3">
                    {transactions.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-full ${tx.type === 'withdrawal' ? 'bg-red-100 text-red-500' : 'bg-emerald-100 text-emerald-500'}`}>
                                    {tx.type === 'withdrawal' ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
                                </div>
                                <div>
                                    <p className="font-bold text-slate-700 text-sm">{tx.description || "İşlem"}</p>
                                    <p className="text-xs text-slate-400">{new Date(tx.created_at).toLocaleDateString('tr-TR')}</p>
                                </div>
                            </div>
                            <span className={`font-black text-sm ${tx.type === 'withdrawal' ? 'text-red-500' : 'text-emerald-600'}`}>
                                {tx.type === 'withdrawal' ? '-' : '+'}{tx.amount} TL
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    )
}
