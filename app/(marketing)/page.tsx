"use client"

import { Shell } from "@/components/layout/shell"
import { LoginForm } from "@/components/features/auth/login-form"
import { Character } from "@/components/ui/character"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2, Star, ShieldCheck, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <Shell>
      <div className="flex flex-col min-h-screen relative overflow-hidden bg-gradient-to-b from-emerald-50/50 to-white">

        {/* Background Decorations - Bubbles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-yellow-200/30 rounded-full blur-[120px] animate-float delay-0" />
          <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-emerald-300/20 rounded-full blur-[100px] animate-float delay-1000" />
          <div className="absolute top-[40%] left-[20%] w-[200px] h-[200px] bg-purple-200/30 rounded-full blur-[80px] animate-float delay-2000" />
        </div>

        {/* HERO SECTION */}
        <div className="flex-1 flex flex-col md:flex-row items-center justify-center container mx-auto px-4 py-8 md:py-20 gap-8 md:gap-16">

          {/* LEFT: Marketing Copy */}
          <div className="flex-1 space-y-8 text-center md:text-left z-10 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-100 shadow-sm text-emerald-800 font-bold text-sm mb-6 animate-pulse-slow">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>Çocuklar için Finansal Okuryazarlık</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-[1.1] mb-6">
                Parayı Yönetmeyi <span className="text-emerald-500 relative">
                  Oyunla
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-emerald-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
                </span> Öğren!
              </h1>

              <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed mb-8">
                Kumbo, çocuklara harçlıklarını yönetmeyi, hedeflerine sabırla ulaşmayı ve finansal özgürlüğü eğlenceli görevlerle öğretir.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                <div className="flex items-center gap-2 text-slate-500 font-bold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Ebeveyn Onaylı
                </div>
                <div className="flex items-center gap-2 text-slate-500 font-bold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Güvenli Ortam
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Login Card / Hero Image */}
          <motion.div
            className="flex-1 w-full max-w-md relative z-20"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Character floating behind/beside the form */}
            <div className="absolute -top-16 -right-12 hidden md:block animate-bounce-slow z-30">
              <Character variant="guide" size="lg" />
            </div>

            <div className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl overflow-hidden relative">
              <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-emerald-400 to-teal-500" />
              <LoginForm />
            </div>
          </motion.div>

        </div>

        {/* FEATURES STRIP */}
        <div className="bg-white/50 backdrop-blur-sm border-t border-slate-100 py-12">
          <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">

            <FeatureCard
              icon={<TrendingUp className="w-8 h-8 text-blue-500" />}
              title="Hedef Belirle"
              desc="Hayalindeki oyuncak veya bisiklet için hedefler oluştur, ilerlemeni takip et."
              color="bg-blue-50 border-blue-100"
            />

            <FeatureCard
              icon={<Star className="w-8 h-8 text-yellow-500" />}
              title="Görevleri Tamamla"
              desc="Odanı topla, ödevini yap, harçlığını kazan! Sorumluluk bilinci gelişsin."
              color="bg-yellow-50 border-yellow-100"
            />

            <FeatureCard
              icon={<ShieldCheck className="w-8 h-8 text-emerald-500" />}
              title="Güvenli Birikim"
              desc="Ebeveyn kontrolünde güvenli dijital kumbara. Harcamaları birlikte yönetin."
              color="bg-emerald-50 border-emerald-100"
            />

          </div>
        </div>

      </div>
    </Shell>
  )
}

function FeatureCard({ icon, title, desc, color }: { icon: React.ReactNode, title: string, desc: string, color: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`p-6 rounded-2xl border ${color} flex flex-col items-center text-center space-y-4 shadow-sm hover:shadow-md transition-all cursor-default`}
    >
      <div className="p-4 bg-white rounded-full shadow-sm">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-800">{title}</h3>
      <p className="text-slate-600 leading-relaxed">
        {desc}
      </p>
    </motion.div>
  )
}
