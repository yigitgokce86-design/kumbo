"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useStore } from "@/lib/store/use-store"
import { createClient } from "@/lib/supabase/client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, UserPlus, ArrowRight } from "lucide-react"

export default function OnboardingPage() {
    const router = useRouter()
    const { user, fetchUser } = useStore()
    const [mode, setMode] = useState<'select' | 'create' | 'join'>('select')
    const [familyName, setFamilyName] = useState("")
    const [inviteCode, setInviteCode] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleCreateFamily = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        const supabase = createClient()

        try {
            // 1. Create Family
            const code = Math.random().toString(36).substring(2, 8).toUpperCase()
            const { data: family, error: familyError } = await supabase
                .from('families')
                .insert({ name: familyName, invite_code: code })
                .select()
                .single()

            if (familyError) throw familyError

            // 2. Update Profile (Link to Family + Set Role Parent)
            const { error: profileError } = await supabase
                .from('profiles')
                .update({
                    family_id: family.id,
                    role: 'parent'
                })
                .eq('id', user?.id)

            if (profileError) throw profileError

            await fetchUser() // Refresh store
            router.push('/dashboard')

        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleJoinFamily = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        const supabase = createClient()

        try {
            // 1. Find Family by Invite Code
            const { data: family, error: familyError } = await supabase
                .from('families')
                .select('id')
                .eq('invite_code', inviteCode.toUpperCase())
                .single()

            if (familyError || !family) throw new Error("Geçersiz davet kodu.")

            // 2. Update Profile (Link to Family + Set Role Child)
            const { error: profileError } = await supabase
                .from('profiles')
                .update({
                    family_id: family.id,
                    role: 'child'
                })
                .eq('id', user?.id)

            if (profileError) throw profileError

            await fetchUser()
            router.push('/dashboard')

        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    if (mode === 'select') {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <Card className="max-w-md w-full p-8 space-y-8 bg-white shadow-xl rounded-3xl">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-black text-slate-900">Hoş Geldin! 👋</h1>
                        <p className="text-slate-500">Kumbo'ya başlamak için bir seçim yap.</p>
                    </div>

                    <div className="space-y-4">
                        <Button
                            onClick={() => setMode('create')}
                            className="w-full h-auto py-6 bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-200 text-emerald-900 rounded-2xl flex flex-col items-center gap-2 group transition-all"
                        >
                            <Users size={32} className="group-hover:scale-110 transition-transform text-emerald-600" />
                            <span className="font-bold text-lg">Yeni Aile Oluştur</span>
                            <span className="text-xs text-emerald-600 font-medium">Ebeveynler için</span>
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-slate-200" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-slate-400 font-bold">veya</span>
                            </div>
                        </div>

                        <Button
                            onClick={() => setMode('join')}
                            className="w-full h-auto py-6 bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-700 rounded-2xl flex flex-col items-center gap-2 group transition-all"
                        >
                            <UserPlus size={32} className="group-hover:scale-110 transition-transform text-slate-400" />
                            <span className="font-bold text-lg">Aileye Katıl</span>
                            <span className="text-xs text-slate-400 font-medium">Davet kodu ile</span>
                        </Button>
                    </div>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <Card className="max-w-md w-full p-8 space-y-6 bg-white shadow-xl rounded-3xl relative">
                <Button
                    variant="ghost"
                    onClick={() => setMode('select')}
                    className="absolute top-4 left-4 text-slate-400 hover:text-slate-600"
                >
                    ← Geri
                </Button>

                <div className="text-center pt-4">
                    <h2 className="text-2xl font-black text-slate-900">
                        {mode === 'create' ? 'Aile Kurulumu 🏠' : 'Aileye Katıl 🔑'}
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">
                        {mode === 'create'
                            ? 'Aileniz için bir isim belirleyin.'
                            : 'Ebeveyninden aldığın 6 haneli kodu gir.'}
                    </p>
                </div>

                <form onSubmit={mode === 'create' ? handleCreateFamily : handleJoinFamily} className="space-y-4">
                    {mode === 'create' ? (
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Aile Adı</label>
                            <Input
                                placeholder="Örn: Yılmaz Ailesi"
                                value={familyName}
                                onChange={(e) => setFamilyName(e.target.value)}
                                className="h-12 bg-slate-50 border-slate-200 text-lg"
                                required
                            />
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Davet Kodu</label>
                            <Input
                                placeholder="XXXXXX"
                                value={inviteCode}
                                onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                                className="h-12 bg-slate-50 border-slate-200 text-lg tracking-widest text-center font-mono uppercase"
                                maxLength={6}
                                required
                            />
                        </div>
                    )}

                    {error && <p className="text-red-500 text-sm font-medium text-center bg-red-50 p-2 rounded-lg">{error}</p>}

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg rounded-xl shadow-lg shadow-slate-200"
                    >
                        {loading ? 'İşleniyor...' : (mode === 'create' ? 'Oluştur ve Devam Et' : 'Katıl')} <ArrowRight className="ml-2" size={20} />
                    </Button>
                </form>
            </Card>
        </div>
    )
}
