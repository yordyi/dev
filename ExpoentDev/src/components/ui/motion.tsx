"use client"

import { cn } from "@/lib/utils"
import { motion, MotionProps } from "framer-motion"

interface AnimatedCardProps extends MotionProps {
  children: React.ReactNode
  className?: string
}

export function AnimatedCard({ children, className, ...props }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedSection({ children, className, ...props }: AnimatedCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.section>
  )
}