"use client"

import { FC, useEffect, useRef, useState } from "react"
import { motion, useSpring, useMotionValue } from "motion/react"

interface Position {
  x: number
  y: number
}




export function SmoothCursor() {
  const [cursor, setCursor] = useState("🤚")
  const [isMoving, setIsMoving] = useState(false)
  const lastMousePos = useRef<Position>({ x: 0, y: 0 })
  const velocity = useRef<Position>({ x: 0, y: 0 })
  const lastUpdateTime = useRef(Date.now())

  const isClicking = useRef(false)

  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  const rotation = useSpring(0, {
    damping: 30,
    stiffness: 200,
    mass: 0.8,
  })

  const scale = useSpring(1, {
    stiffness: 500,
    damping: 35,
  })

  useEffect(() => {
    const updateVelocity = (currentPos: Position) => {
      const currentTime = Date.now()
      const deltaTime = currentTime - lastUpdateTime.current

      if (deltaTime > 0) {
        velocity.current = {
          x: (currentPos.x - lastMousePos.current.x) / deltaTime,
          y: (currentPos.y - lastMousePos.current.y) / deltaTime,
        }
      }

      lastUpdateTime.current = currentTime
      lastMousePos.current = currentPos
    }

    const smoothMouseMove = (e: MouseEvent) => {
      const currentPos = { x: e.clientX, y: e.clientY }
      updateVelocity(currentPos)

      cursorX.set(currentPos.x)
      cursorY.set(currentPos.y)

      // --- TILT LOGIC ---
      // Only tilt based on velocity if we are NOT clicking
      if (!isClicking.current) {
        const rotateAmount = velocity.current.x * 5
        const clampedRotation = Math.max(-30, Math.min(30, rotateAmount))
        rotation.set(clampedRotation)
      }

      // --- SCALE LOGIC ---
      const speed = Math.sqrt(
        Math.pow(velocity.current.x, 2) + Math.pow(velocity.current.y, 2)
      )

      if (speed > 0.1) {
        if (!isClicking.current) {
          scale.set(0.95)
        }
        setIsMoving(true)

        const timeout = setTimeout(() => {
          if (!isClicking.current) {
            scale.set(1)
            rotation.set(0)
          }
          setIsMoving(false)
        }, 150)

        return () => clearTimeout(timeout)
      }
    }

    const handleMouseDown = () => {
      isClicking.current = true
      setCursor("👏")
      scale.set(0.45)
      // Rotate for impact (counter-clockwise dip)
      rotation.set(-25)
    }

    const handleMouseUp = () => {
      isClicking.current = false
      scale.set(1)
      setCursor("🤚")
      rotation.set(0)
    }

    let rafId: number
    const throttledMouseMove = (e: MouseEvent) => {
      if (rafId) return

      rafId = requestAnimationFrame(() => {
        smoothMouseMove(e)
        rafId = 0
      })
    }

    document.body.style.cursor = "none"
    window.addEventListener("mousemove", throttledMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", throttledMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = "auto"
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [cursorX, cursorY, rotation, scale])

  return (
    <motion.div
      style={{
        position: "fixed",
        left: cursorX,
        top: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        rotate: rotation,
        scale: scale,
        zIndex: 100,
        pointerEvents: "none",
        willChange: "transform",
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
      }}
    >
      <div className="text-5xl -translate-y-5 -translate-x-5">
        {cursor}
      </div>
    </motion.div>
  )
}