"use client"

import { useStore } from "@/lib/store/use-store"
import { Character } from "@/components/ui/character"
import { BadgeList } from "@/components/features/gamification/badge-list"
import { MOCK_BADGES } from "@/lib/content-data"


export default function ProfilePage() {
    const { user, xp, badges } = useStore()

    // Simple Level Logic: 1 Level per 100 XP
    const level = Math.floor(xp / 100) + 1
    const nextLevelXp = level * 100
    const currentLevelXp = xp % 100
    const progress = (currentLevelXp / 100) * 100

    return (
        <div className="flex flex-col gap-6 p-4 pb-24">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-emerald-900 -tracking-wide">Profilim 👤</h1>
                <p className="text-emerald-700 font-medium">Başarılarını buradan takip et.</p>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-[2rem] p-6 border-4 border-emerald-50 shadow-xl flex flex-col items-center text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-emerald-50 to-transparent pointer-events-none" />

                <div className="relative z-10 mb-4">
                    <Character variant="guide" size="lg" />
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 font-black px-4 py-1 rounded-full border-2 border-white shadow-sm whitespace-nowrap">
                        Seviye {level}
                    </div>
                </div>

                <h2 className="text-2xl font-black text-emerald-950 mt-2">{user?.full_name || user?.username || "Kaşif"}</h2>
                <p className="text-emerald-600 font-medium text-sm mb-6">{user?.role === 'child' ? 'Minik Yatırımcı' : 'Ebeveyn'}</p>

                {/* XP Progress */}
                <div className="w-full space-y-2 mb-2">
                    <div className="flex justify-between text-xs font-bold text-emerald-800">
                        <span>{currentLevelXp} XP</span>
                        <span className="text-emerald-400">{100} XP (Sonraki Seviye)</span>
                    </div>
                    <div className="h-4 bg-emerald-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-emerald-400 rounded-full transition-all duration-1000 shadow-[0_2px_5px_rgba(16,185,129,0.2)]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <p className="text-xs text-emerald-600/60 font-medium">Toplam XP: {xp}</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-orange-50 p-4 rounded-2xl border-2 border-orange-100 text-center">
                    <div className="text-3xl mb-1">🔥</div>
                    <div className="font-black text-orange-900 text-xl">3 Gün</div>
                    <div className="text-xs font-bold text-orange-600 uppercase tracking-widest">Seri</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-2xl border-2 border-blue-100 text-center">
                    <div className="text-3xl mb-1">🎓</div>
                    <div className="font-black text-blue-900 text-xl">12 Ders</div>
                    <div className="text-xs font-bold text-blue-600 uppercase tracking-widest">Tamamlandı</div>
                </div>
            </div>

            {/* Badges Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-emerald-900">Rozet Koleksiyonu</h3>
                    <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded-lg">
                        {badges.filter(b => b.isEarned).length} / {badges.length}
                    </span>
                </div>
                <BadgeList badges={badges} />
            </div>
        </div>
    )
}
