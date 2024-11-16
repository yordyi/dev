"use client"

import { useEffect } from "react"
import { useFinanceStore } from "@/stores/finance"

export function DataInitializer() {
  const { syncAllData } = useFinanceStore()

  useEffect(() => {
    // 组件加载时同步所有数据
    syncAllData()
  }, [syncAllData])

  return null
} 