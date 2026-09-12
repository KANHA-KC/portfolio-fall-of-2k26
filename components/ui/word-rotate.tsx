"use client"

import React from "react"
import { AnimatePresence, HTMLMotionProps, motion } from "motion/react"

import { cn } from "@/lib/utils"

/**
 * Props for the WordRotate component
 */
export interface WordRotateProps {
  /**
   * Array of words to rotate through
   */
  words: string[]
  /**
   * Duration in milliseconds for each word display before rotating to the next
   * @default 2000
   */
  duration?: number
  /**
   * Optional custom container class name (e.g. for inline or compact navbar usage)
   */
  containerClassName?: string
  /**
   * Optional initial delay in milliseconds before the first rotation
   * @default 0
   */
  delay?: number
}

export function WordRotate({
  words,
  className,
  containerClassName,
  duration = 2000,
  delay = 0,
}: HTMLMotionProps<"div"> & WordRotateProps) {
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const startTimer = () => {
      timeoutId = setTimeout(() => {
        setIndex((prev) => (prev === words.length - 1 ? 0 : prev + 1))
      }, duration)
    }

    if (delay > 0 && index === 0) {
      const initialDelayTimer = setTimeout(startTimer, delay)
      return () => {
        clearTimeout(initialDelayTimer)
        clearTimeout(timeoutId)
      }
    } else {
      startTimer()
      return () => clearTimeout(timeoutId)
    }
  }, [index, words.length, duration, delay])

  return (
    <div className={cn("overflow-hidden p-2", containerClassName)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={words[index]}
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -35 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className={cn(className)}
        >
          {words[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
