"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import { useStore } from "@/lib/store/use-store"
import { useTheme } from "@/lib/store/use-theme"
import { Character } from "@/components/ui/character"
import { MICROCOPY } from "@/lib/theme-config"
import { loginWithEmail, loginWithGoogle } from "@/lib/auth"

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
        // Note: For OLP, we are simulating Child Login with PIN by just checking valid format
        // In real app, this would verify against a hashed PIN in the Profile.
        // For now, allow any entry to demo the flow, or map to a demo user.

        // Simulating a successful login for "Can" (Child)
        // We'll update this to real auth if the user has a way to auth kids (usually via Parent's account + PIN)
        setTimeout(() => {
            setUser({ id: 'demo-child-id', full_name: 'Can', role: 'child' } as any) // temporary cast or correct type
            setLoading(false)
            router.push('/dashboard')
        }, 1000)
    }

    async function onParentSubmit(values: z.infer<typeof parentSchema>) {
        setLoading(true)
        const { data, error } = await loginWithEmail(values.email)

        if (error) {
            console.error(error)
            // set error state
        } else {
            // In Supabase, Magic Link sends an email. 
            // We should show a "Check your email" message.
            alert("Lütfen giriş yapmak için e-posta kutunuzu kontrol edin (Magic Link).")
        }
        setLoading(false)
    }

    async function handleGoogleLogin() {
        setLoading(true)
        await loginWithGoogle()
        // Redirect handled by Supabase
    }

    return (
        <div className="w-full max-w-lg mx-auto p-4 animate-in fade-in zoom-in duration-500">
            <Card className="toy-card border-none p-8 space-y-8">
                <CardHeader className="p-0 space-y-4 text-center">
                    <div className="mx-auto w-20 h-2 bg-emerald-100 rounded-full mb-4" /> {/* Decorative Handle */}
                    <CardTitle className="text-4xl font-black text-slate-800 tracking-tight">Giriş Yap</CardTitle>
                    <CardDescription className="text-lg text-slate-500 font-bold">Kumbo hesabına eriş</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <Tabs defaultValue="child" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-8 h-14 bg-slate-100 p-1 rounded-2xl">
                            <TabsTrigger
                                value="child"
                                className="h-full rounded-xl text-lg font-bold data-[state=active]:bg-white data-[state=active]:text-emerald-600 data-[state=active]:shadow-sm transition-all"
                            >
                                <User className="w-5 h-5 mr-2" /> Çocuk
                            </TabsTrigger>
                            <TabsTrigger
                                value="parent"
                                className="h-full rounded-xl text-lg font-bold data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-sm transition-all"
                            >
                                <Shield className="w-5 h-5 mr-2" /> Ebeveyn
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="child" className="space-y-8">
                            <div className="flex flex-col items-center space-y-4 py-4 bg-emerald-50/50 rounded-3xl border border-emerald-100 border-dashed">
                                <Character variant="guide" size="md" speaking />
                                <p className="text-center text-emerald-800 text-lg font-bold px-4 max-w-xs leading-tight">
                                    "{MICROCOPY.onboarding[currentTheme]}"
                                </p>
                            </div>

                            <form onSubmit={childForm.handleSubmit(onChildSubmit)} className="space-y-6">
                                <div className="space-y-4">
                                    <Label htmlFor="pin" className="block text-center text-slate-400 font-bold uppercase tracking-widest text-sm">Gizli Kodun (PIN)</Label>
                                    <div className="relative max-w-[200px] mx-auto">
                                        <Input
                                            id="pin"
                                            type="password"
                                            placeholder="••••"
                                            className="toy-input text-center text-4xl tracking-[0.5em] h-20 bg-white border-4 border-emerald-100 text-emerald-600 rounded-2xl focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 shadow-inner placeholder:text-emerald-100 font-black"
                                            maxLength={4}
                                            {...childForm.register("pin")}
                                        />
                                    </div>
                                    {childForm.formState.errors.pin && (
                                        <p className="text-center text-red-500 font-bold animate-pulse">{childForm.formState.errors.pin.message}</p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-16 text-xl rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white shadow-[0_6px_0_0_#059669] active:shadow-none active:translate-y-[6px] transition-all font-black uppercase tracking-wide"
                                    disabled={loading}
                                >
                                    {loading ? "GİRİLİYOR..." : "BAŞLA! 🚀"}
                                </Button>
                            </form>
                        </TabsContent>

                        <TabsContent value="parent" className="space-y-6">
                            <form onSubmit={parentForm.handleSubmit(onParentSubmit)} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="font-bold text-slate-700 ml-1">E-posta</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="ornek@kumbo.app"
                                        className="toy-input h-14 bg-slate-50 border-2 border-slate-200"
                                        {...parentForm.register("email")}
                                    />
                                    {parentForm.formState.errors.email && (
                                        <p className="text-sm text-red-500 font-bold">{parentForm.formState.errors.email.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="font-bold text-slate-700 ml-1">Şifre</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        className="toy-input h-14 bg-slate-50 border-2 border-slate-200"
                                        {...parentForm.register("password")}
                                    />
                                    {parentForm.formState.errors.password && (
                                        <p className="text-sm text-red-500 font-bold">{parentForm.formState.errors.password.message}</p>
                                    )}
                                </div>

                                <div className="pt-4 space-y-3">
                                    <Button
                                        type="submit"
                                        className="w-full h-14 rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-[0_4px_0_0_#000] active:shadow-none active:translate-y-[4px] transition-all font-bold"
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
                                        className="w-full h-14 rounded-xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 hover:text-slate-900"
                                        onClick={handleGoogleLogin}
                                    >
                                        <svg className="mr-2 h-5 w-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                            <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                                        </svg>
                                        Google ile Devam Et
                                    </Button>
                                </div>
                            </form>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
