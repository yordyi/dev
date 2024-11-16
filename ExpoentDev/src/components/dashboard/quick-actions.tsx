"use client"

import { Button } from "@/components/ui/button"
import { NewTransactionDialog } from "./new-transaction-dialog"
import { ArrowDownCircle, ArrowUpCircle, FileText, PieChart } from "lucide-react"
import { useRouter } from "next/navigation"

export function QuickActions() {
  const router = useRouter()

  return (
    <div className="flex flex-wrap gap-2">
      <NewTransactionDialog />

      <Button variant="outline" className="gap-2" onClick={() => router.push('/dashboard/transactions?type=income')}>
        <ArrowDownCircle className="h-4 w-4 text-green-500" />
        记录收入
      </Button>

      <Button variant="outline" className="gap-2" onClick={() => router.push('/dashboard/transactions?type=expense')}>
        <ArrowUpCircle className="h-4 w-4 text-red-500" />
        记录支出
      </Button>

      <Button variant="outline" className="gap-2" onClick={() => router.push('/dashboard/reports')}>
        <FileText className="h-4 w-4" />
        生成报表
      </Button>

      <Button variant="outline" className="gap-2" onClick={() => router.push('/dashboard/budget')}>
        <PieChart className="h-4 w-4" />
        预算设置
      </Button>
    </div>
  )
}