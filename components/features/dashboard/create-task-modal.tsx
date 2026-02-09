"use client"

import { useState } from "react"
import { useStore } from "@/lib/store/use-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus } from "lucide-react"

export function CreateTaskModal() {
    const { activeChild, createTask } = useStore()
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState("")
    const [reward, setReward] = useState("10")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!activeChild || !title) return

        await createTask(title, Number(reward), activeChild.id)

        setIsOpen(false)
        setTitle("")
        setReward("10")
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="w-full bg-slate-900 text-white hover:bg-slate-800 rounded-xl py-6 flex items-center gap-2 text-lg font-bold shadow-md">
                    <Plus size={24} /> Yeni Görev Ekle
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-black text-slate-800">Görev Oluştur</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-600">Görev Adı</label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Örn: Odamı topladım"
                            className="bg-slate-50 border-slate-200"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-600">Ödül (TL)</label>
                        <div className="flex gap-2">
                            {[10, 20, 50].map((amt) => (
                                <button
                                    key={amt}
                                    type="button"
                                    onClick={() => setReward(amt.toString())}
                                    className={`flex-1 py-2 rounded-lg font-bold border-2 transition-all ${reward === amt.toString()
                                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                            : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                                        }`}
                                >
                                    {amt} TL
                                </button>
                            ))}
                        </div>
                        <Input
                            type="number"
                            value={reward}
                            onChange={(e) => setReward(e.target.value)}
                            className="mt-2 bg-slate-50 border-slate-200"
                        />
                    </div>

                    <Button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold h-12 rounded-xl text-lg">
                        Oluştur
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
