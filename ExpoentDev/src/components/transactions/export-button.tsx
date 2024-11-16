"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFinanceStore } from "@/stores/finance"
import * as XLSX from 'xlsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"

type ExportFormat = 'excel' | 'csv' | 'json'

export function ExportButton() {
  const [isExporting, setIsExporting] = useState(false)
  const { transactions, statistics } = useFinanceStore()

  const handleExport = async (format: ExportFormat) => {
    try {
      setIsExporting(true)
      
      // 准备导出数据
      const transactionData = transactions.map(t => ({
        日期: t.date,
        描述: t.description,
        分类: t.category,
        金额: t.amount,
        账户: t.account,
        标签: t.tags.join(', ')
      }))

      const summaryData = [{
        总收入: statistics.totalIncome,
        总支出: statistics.totalExpense,
        总结余: statistics.totalBalance
      }]

      const categoryData = Object.entries(statistics.categoryStats).map(([category, stats]) => ({
        分类: category,
        收入: stats.income,
        支出: stats.expense
      }))

      switch (format) {
        case 'excel': {
          const wb = XLSX.utils.book_new()
          
          // 添加交易明细表
          const wsTransactions = XLSX.utils.json_to_sheet(transactionData)
          XLSX.utils.book_append_sheet(wb, wsTransactions, "交易明细")
          
          // 添加统计汇总表
          const wsSummary = XLSX.utils.json_to_sheet(summaryData)
          XLSX.utils.book_append_sheet(wb, wsSummary, "统计汇总")
          
          // 添加分类统计表
          const wsCategory = XLSX.utils.json_to_sheet(categoryData)
          XLSX.utils.book_append_sheet(wb, wsCategory, "分类统计")
          
          XLSX.writeFile(wb, `财务报表_${new Date().toISOString().split('T')[0]}.xlsx`)
          break
        }
        
        case 'csv': {
          const ws = XLSX.utils.json_to_sheet(transactionData)
          const csv = XLSX.utils.sheet_to_csv(ws)
          const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          link.download = `交易记录_${new Date().toISOString().split('T')[0]}.csv`
          link.click()
          break
        }
        
        case 'json': {
          const data = {
            transactions: transactionData,
            summary: summaryData[0],
            categoryStats: categoryData
          }
          const json = JSON.stringify(data, null, 2)
          const blob = new Blob([json], { type: 'application/json' })
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          link.download = `财务数据_${new Date().toISOString().split('T')[0]}.json`
          link.click()
          break
        }
      }

      toast({
        title: "导出成功",
        description: "文件已开始下载",
      })
    } catch (error) {
      toast({
        title: "导出失败",
        description: "导出过程中发生错误",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          disabled={isExporting}
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          {isExporting ? '导出中...' : '导出'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleExport('excel')}>
          导出为 Excel
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('csv')}>
          导出为 CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('json')}>
          导出为 JSON
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 