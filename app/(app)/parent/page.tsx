"use client"

import { useState } from "react"
import { useStore } from "@/lib/store/use-store"
import { ParentPinGate } from "@/components/features/parent/parent-pin-gate"
import { ParentAddMoney } from "@/components/features/parent/parent-add-money"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Character } from "@/components/ui/character"
import { Shield, Sparkles } from "lucide-react"

export default function ParentDashboard() {
    const [isUnlocked, setIsUnlocked] = useState(false)
    const { user, goals, xp } = useStore()

    if (!isUnlocked) {
        return <ParentPinGate onUnlock={() => setIsUnlocked(true)} />
    }

    // Calculators
    const totalGoals = goals.length
    const totalSavings = goals.reduce((acc, g) => acc + g.current_amount, 0)

    return (
        <div className="flex flex-col gap-8 p-4 pb-24 max-w-4xl mx-auto">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">Ebeveyn Paneli 🛡️</h1>
                    <p className="text-slate-500 font-medium">Çocuğunuzun finansal yolculuğunu yönetin.</p>
                </div>
                <div className="bg-slate-100 p-3 rounded-full">
                    <Shield className="text-slate-400" />
                </div>
            </div>

            {/* Child Overview */}
            <h2 className="text-xl font-bold text-slate-700">Genel Bakış: {user?.full_name || user?.username || "Çocuğunuz"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-6 bg-white border-none shadow-sm rounded-[2rem] flex flex-col items-center justify-center text-center space-y-2">
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">TOPLAM BİRİKİM</span>
                    <span className="text-4xl font-black text-emerald-500">{totalSavings} TL</span>
                </Card>
                <Card className="p-6 bg-white border-none shadow-sm rounded-[2rem] flex flex-col items-center justify-center text-center space-y-2">
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">AKTİF HEDEF</span>
                    <span className="text-4xl font-black text-amber-500">{totalGoals}</span>
                </Card>
                <Card className="p-6 bg-white border-none shadow-sm rounded-[2rem] flex flex-col items-center justify-center text-center space-y-2">
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">BİLGİ SEVİYESİ</span>
                    <div className="flex items-center gap-2 text-4xl font-black text-indigo-500">
                        <Sparkles size={28} className="text-amber-400 fill-current" />
                        {Math.floor(xp / 100) + 1}. Lv
                    </div>
                </Card>
            </div>

            {/* Actions */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-700">Kontrol Merkezi</h2>
                <div className="bg-white p-6 rounded-[2rem] shadow-sm space-y-4">

                    <ParentAddMoney />

                    <div className="flex items-center gap-4 border-t border-slate-100 pt-4 opacity-50 cursor-not-allowed">
                        <div className="bg-purple-100 p-3 rounded-xl text-purple-600">
                            <Character variant="logic" size="sm" className="w-10 h-10" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-slate-800">Hesap Ayarları</h3>
                            <p className="text-sm text-slate-500">Profil bilgilerini düzenleyin.</p>
                        </div>
                        <Button disabled variant="outline" className="opacity-50">Yakında</Button>
                    </div>
                </div>
            </div>

        </div>
    )
}
