"use client"

import { useState } from "react"
import { useStore } from "@/lib/store/use-store"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Target, Sparkles, Plus } from "lucide-react"

interface CreateGoalModalProps {
    isOpen: boolean
    onClose: () => void
}

export function CreateGoalModal({ isOpen, onClose }: CreateGoalModalProps) {
    const { addGoal } = useStore()
    const [title, setTitle] = useState("")
    const [amount, setAmount] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!title || !amount) return

        setLoading(true)
        try {
            // Assume addGoal handles Supabase call
            // If strictly local store for now, we might need to add logic here or in store
            // Let's implement addGoal in store if missing or use it directly
            await addGoal(title, Number(amount))
            onClose()
            setTitle("")
            setAmount("")
        } catch (error) {
            console.error("Failed to create goal", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-white border-4 border-emerald-100 rounded-[2rem]">
                <DialogHeader>
                    <div className="mx-auto bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-emerald-600">
                        <Target size={32} />
                    </div>
                    <DialogTitle className="text-center text-2xl font-black text-emerald-900">
                        Yeni Hedef Belirle 🎯
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-emerald-700 font-bold ml-1">Hedefin Ne?</Label>
                        <Input
                            id="title"
                            placeholder="Örn: LEGO Seti, Bisiklet..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="h-14 rounded-xl border-2 border-emerald-100 bg-emerald-50/50 text-lg px-4 focus:ring-emerald-200 focus:border-emerald-400"
                            autoFocus
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="amount" className="text-emerald-700 font-bold ml-1">Hedef Tutar (TL)</Label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400 font-bold text-lg">₺</span>
                            <Input
                                id="amount"
                                type="number"
                                placeholder="500"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="h-14 pl-10 rounded-xl border-2 border-emerald-100 bg-emerald-50/50 text-lg font-bold text-emerald-900 focus:ring-emerald-200 focus:border-emerald-400"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={loading || !title || !amount}
                            className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-lg rounded-xl shadow-[0_4px_0_0_#059669] active:shadow-none active:translate-y-[4px] transition-all"
                        >
                            {loading ? "Oluşturuluyor..." : (
                                <><Plus className="mr-2 stroke-[3]" /> Hedefi Başlat</>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
