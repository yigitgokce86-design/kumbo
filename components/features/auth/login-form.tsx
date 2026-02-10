"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Shield, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useStore } from "@/lib/store/use-store"
import { useTheme } from "@/lib/store/use-theme"
import { Character } from "@/components/ui/character"
import { MICROCOPY } from "@/lib/theme-config"
import { loginWithEmail, loginWithGoogle } from "@/lib/auth"
import { cn } from "@/lib/utils"

// Zod Schemas
const childSchema = z.object({
    pin: z.string().min(4, "PIN 4 haneli olmalı").max(4),
})

const parentSchema = z.object({
    email: z.string().email("Geçerli bir e-posta adresi giriniz."),
    password: z.string().min(6, "Şifre en az 6 karakter olmalıdır."),
})

export function LoginForm() {
    const [loading, setLoading] = React.useState(false)
    const setUser = useStore((state) => state.setUser)
    const router = useRouter()
    const { currentTheme } = useTheme()

    const childForm = useForm<z.infer<typeof childSchema>>({
        resolver: zodResolver(childSchema),
    })

    const parentForm = useForm<z.infer<typeof parentSchema>>({
        resolver: zodResolver(parentSchema),
    })

    async function onChildSubmit(values: z.infer<typeof childSchema>) {
        setLoading(true)
        // Simulate Child Login
        setTimeout(() => {
            setUser({ id: 'demo-child-id', full_name: 'Can', role: 'child' } as any)
            setLoading(false)
            router.push('/dashboard')
        }, 800)
    }

    async function onParentSubmit(values: z.infer<typeof parentSchema>) {
        setLoading(true)
        const { data, error } = await loginWithEmail(values.email)
        if (error) {
            console.error(error)
        } else {
            alert("Lütfen giriş yapmak için e-posta kutunuzu kontrol edin (Magic Link).")
        }
        setLoading(false)
    }

    async function handleGoogleLogin() {
        setLoading(true)
        await loginWithGoogle()
    }

    return (
        <div className="p-8 pb-12">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Giriş Yap</h2>
                <p className="text-slate-500 font-medium">Kumbo hesabına eriş</p>
            </div>

            <Tabs defaultValue="child" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-100/80 p-1 rounded-2xl h-auto">
                    <TabsTrigger
                        value="child"
                        className="rounded-xl py-3 text-sm font-bold data-[state=active]:bg-white data-[state=active]:text-emerald-600 data-[state=active]:shadow-sm transition-all"
                    >
                        <User className="w-4 h-4 mr-2" /> Çocuk
                    </TabsTrigger>
                    <TabsTrigger
                        value="parent"
                        className="rounded-xl py-3 text-sm font-bold data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-sm transition-all"
                    >
                        <Shield className="w-4 h-4 mr-2" /> Ebeveyn
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="child" className="space-y-6 focus-visible:outline-none focus-visible:ring-0">
                    <div className="flex flex-col items-center space-y-4 py-6 bg-emerald-50/50 rounded-3xl border border-emerald-100/50">
                        <Character variant="guide" size="sm" speaking />
                        <p className="text-center text-emerald-800 text-sm font-bold px-4 leading-tight">
                            "{MICROCOPY.onboarding[currentTheme]}"
                        </p>
                    </div>

                    <form onSubmit={childForm.handleSubmit(onChildSubmit)} className="space-y-6">
                        <div className="space-y-4">
                            <Label htmlFor="pin" className="block text-center text-slate-400 font-bold uppercase tracking-widest text-xs">Gizli Kodun (PIN)</Label>
                            <div className="relative max-w-[180px] mx-auto group">
                                <div className="absolute inset-0 bg-emerald-200/20 rounded-2xl blur-xl group-hover:bg-emerald-300/30 transition-all opacity-0 group-hover:opacity-100" />
                                <Input
                                    id="pin"
                                    type="password"
                                    placeholder="••••"
                                    className="relative text-center text-4xl tracking-[0.4em] h-20 bg-white border-2 border-emerald-100 text-emerald-600 rounded-2xl focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100/50 shadow-sm placeholder:text-emerald-100 font-black transition-all"
                                    maxLength={4}
                                    {...childForm.register("pin")}
                                />
                            </div>
                            {childForm.formState.errors.pin && (
                                <p className="text-center text-red-500 text-sm font-bold animate-pulse">{childForm.formState.errors.pin.message}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-14 text-lg rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 hover:-translate-y-1 active:translate-y-0 transition-all font-bold"
                            disabled={loading}
                        >
                            {loading ? "GİRİLİYOR..." : <span className="flex items-center">BAŞLA <ArrowRight className="ml-2 w-5 h-5" /></span>}
                        </Button>
                    </form>
                </TabsContent>

                <TabsContent value="parent" className="space-y-6 focus-visible:outline-none focus-visible:ring-0">
                    <form onSubmit={parentForm.handleSubmit(onParentSubmit)} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="font-bold text-slate-700 ml-1 text-xs uppercase tracking-wide">E-posta</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="ornek@kumbo.app"
                                className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-xl"
                                {...parentForm.register("email")}
                            />
                            {parentForm.formState.errors.email && (
                                <p className="text-xs text-red-500 font-bold">{parentForm.formState.errors.email.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="font-bold text-slate-700 ml-1 text-xs uppercase tracking-wide">Şifre</Label>
                            <Input
                                id="password"
                                type="password"
                                className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-xl"
                                {...parentForm.register("password")}
                            />
                            {parentForm.formState.errors.password && (
                                <p className="text-xs text-red-500 font-bold">{parentForm.formState.errors.password.message}</p>
                            )}
                        </div>

                        <div className="pt-2 space-y-3">
                            <Button
                                type="submit"
                                className="w-full h-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold shadow-md hover:shadow-lg transition-all"
                                disabled={loading}
                            >
                                {loading ? "Kontrol ediliyor..." : "Giriş Yap"}
                            </Button>

                            <div className="relative py-2">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-slate-200" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white px-2 text-slate-400 font-bold">veya</span>
                                </div>
                            </div>

                            <Button
                                type="button"
                                variant="outline"
                                className="w-full h-12 rounded-xl border-slate-200 text-slate-600 font-bold hover:bg-slate-50 hover:text-slate-900"
                                onClick={handleGoogleLogin}
                            >
                                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                    <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                                </svg>
                                Google ile Devam Et
                            </Button>
                        </div>
                    </form>
                </TabsContent>
            </Tabs>
        </div>
    )
}
