"use client"

import { useState } from "react"
import { useStore } from "@/lib/store/use-store"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet, ArrowRight } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface BalanceAdjustmentModalProps {
    isOpen: boolean
    onClose: () => void
}

export function BalanceAdjustmentModal({ isOpen, onClose }: BalanceAdjustmentModalProps) {
    const { activeChild, setActiveChild } = useStore() // Need to refresh child after update
    const [amount, setAmount] = useState("")
    const [type, setType] = useState<'deposit' | 'withdrawal'>('deposit')
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)

    if (!activeChild) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!amount) return

        setLoading(true)
        const supabase = createClient()

        try {
            const val = Number(amount)

            // 1. Create Transaction
            await supabase.from('transactions').insert({
                user_id: activeChild.id,
                amount: val,
                type: type, // 'deposit' or 'withdrawal'
                description: description || (type === 'deposit' ? 'El ile Para Ekleme' : 'El ile Para Çıkarma')
            })

            // 2. Update Balance logic
            // Assuming we only touch 'digital_balance', or maybe 'cash_balance' depending on requirement.
            // For now, let's treat this as managing the 'Digital Wallet' or 'Pocket Money'.
            // Let's assume it affects digital_balance primarily in this context.
            const rpcFunc = type === 'deposit' ? 'increment_balance' : 'decrement_balance'

            await supabase.rpc(rpcFunc, {
                user_id: activeChild.id,
                amount: val
            })

            // Refresh
            // We can hack a refresh by re-calling setActiveChild to trigger fetchFamily/fetchUser re-logic or just granular update
            // Ideally useStore should have a 'refreshActiveChild' 
            // For now, reload window or rely on optimistic update if we had one.
            // Let's rely on simple page refresh or refetch.
            window.location.reload() // Simplest for now to sync states

            onClose()
            setAmount("")
            setDescription("")
        } catch (error) {
            console.error("Adjustment Error:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-white">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Wallet className="text-emerald-600" />
                        Bakiye Düzenle
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-2">
                    <Tabs defaultValue="deposit" onValueChange={(v) => setType(v as 'deposit' | 'withdrawal')}>
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="deposit" className="text-emerald-600 data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-800">Para Ekle (+)</TabsTrigger>
                            <TabsTrigger value="withdrawal" className="text-red-600 data-[state=active]:bg-red-100 data-[state=active]:text-red-800">Para Çıkar (-)</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <div className="space-y-2">
                        <Label>Tutar (TL)</Label>
                        <Input
                            type="number"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="text-lg font-bold"
                            autoFocus
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Açıklama</Label>
                        <Input
                            placeholder={type === 'deposit' ? "Örn: Bayram harçlığı" : "Örn: Dondurma parası"}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <DialogFooter>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "İşleniyor..." : "Kaydet"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
