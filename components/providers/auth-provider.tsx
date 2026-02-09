"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useStore } from "@/lib/store/use-store"
import { createClient } from "@/lib/supabase/client"

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { user, fetchUser, isLoading } = useStore()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const initAuth = async () => {
            await fetchUser()
        }
        initAuth()

        const supabase = createClient()
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN') await fetchUser()
            if (event === 'SIGNED_OUT') await fetchUser() // clears store
        })

        return () => subscription.unsubscribe()
    }, [])

    useEffect(() => {
        if (isLoading) return

        // 1. If no user, and trying to access protected route -> Redirect Login (Handled by Middleware mostly, but double check)
        // (Middleware handles /dashboard protection)

        // 2. If User exists but NO FAMILY -> Redirect to Onboarding
        // Exception: Don't redirect if already on onboarding
        if (user && !user.family_id && pathname !== '/onboarding') {
            router.push('/onboarding')
        }

        // 3. If User has Family and accessing Onboarding -> Redirect Dashboard
        if (user && user.family_id && pathname === '/onboarding') {
            router.push('/dashboard')
        }

    }, [user, isLoading, pathname])

    return <>{children}</>
}
