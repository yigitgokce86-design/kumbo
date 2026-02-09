"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store/use-store"
import { type Goal } from "@/types/supabase"
import { useTheme } from "@/lib/store/use-theme"
import { motion } from "framer-motion"
import { Plus, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"
import { Character } from "@/components/ui/character"

interface GoalCardProps {
    goal: Goal
}

export function GoalCard({ goal }: GoalCardProps) {
    const addMoney = useStore(state => state.addMoney)
    const { config } = useTheme()

    // Calculate progress
    const percentage = Math.min(100, Math.round((goal.current_amount / goal.target_amount) * 100))
    const isCompleted = percentage >= 100

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <Card className={cn(
                "overflow-hidden transition-all duration-300 hover:shadow-lg border-opacity-50",
                config.colors.cardBg, // Dynamic Card Background
                // Specific border logic could go here
            )}>
                {/* Image Section */}
                <div className="h-32 w-full relative overflow-hidden bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={goal.image_url} alt={goal.title} className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" />

                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                        <div className="flex justify-between items-end w-full">
                            <h3 className="text-white font-bold text-xl drop-shadow-md">{goal.title}</h3>
                            {/* Theme-specific Badge */}
                            <div className={cn("text-xs px-2 py-1 rounded-full font-bold", config.colors.secondary, config.colors.secondaryFg)}>
                                {config.characters.logic.role}
                            </div>
                        </div>
                    </div>
                </div>

                <CardContent className="p-6 space-y-4">
                    {/* Financial Progress */}
                    <div className="flex justify-between items-end">
                        <div>
                            <span className={cn("text-3xl font-bold", config.colors.textMain)}>₺{goal.current_amount}</span>
                            <span className={cn("text-sm", config.colors.textMuted)}> / ₺{goal.target_amount}</span>
                        </div>
                        <div className={cn("text-xl font-bold", config.colors.textMain)}>{percentage}%</div>
                    </div>

                    {/* Theme-Themed Progress Bar */}
                    <div className={cn("h-3 w-full rounded-full overflow-hidden relative", config.colors.primaryBg)}>
                        <motion.div
                            className={cn("h-full rounded-full", config.colors.primary)}
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        />
                    </div>

                    {/* Character Helper Message (Robot Logic) */}
                    <div className="flex items-center gap-3">
                        <Character variant="logic" size="sm" className="w-10 h-10" />
                        <p className={cn("text-xs italic", config.colors.textMuted)}>
                            "{config.characters.guide.name}: Hedefe ulaşmana az kaldı!"
                        </p>
                    </div>

                </CardContent>

                <CardFooter className="p-6 pt-0">
                    {isCompleted ? (
                        <Button className={cn("w-full font-bold", config.colors.secondary, config.colors.secondaryFg)}>
                            <Trophy className="mr-2 h-4 w-4" /> {config.rewards.completion} Kazandın!
                        </Button>
                    ) : (
                        <Button
                            className={cn("w-full hover:opacity-90 transition-opacity", config.colors.primary, config.colors.primaryFg)}
                            onClick={() => addMoney(goal.id, 50)}
                        >
                            <Plus className="mr-2 h-4 w-4" /> 50₺ Ekle ({config.characters.guide.role})
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </motion.div>
    )
}
