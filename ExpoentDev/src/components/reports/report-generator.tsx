"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { useFinanceStore } from "@/stores/finance"
import { Download, FileSpreadsheet, FileText } from "lucide-react"
import * as XLSX from 'xlsx'

type ReportType = 'summary' | 'detailed' | 'category' | 'trend'
type ReportFormat = 'excel' | 'pdf'

export function ReportGenerator() {
  const { transactions } = useFinanceStore()
  const [reportType, setReportType] = useState<ReportType>('summary')
  const [format, setFormat] = useState<ReportFormat>('excel')
  const [isGenerating, setIsGenerating] = useState(false)

  const generateReport = async () => {
    setIsGenerating(true)
    try {
      let reportData: any[] = []

      switch (reportType) {
        case 'summary':
          reportData = [{
            总收入: transactions.reduce((sum, t) => t.amount > 0 ? sum + t.amount : sum, 0),
            总支出: transactions.reduce((sum, t) => t.amount < 0 ? sum + Math.abs(t.amount) : sum, 0),
            净收入: transactions.reduce((sum, t) => sum + t.amount, 0),
          }]
          break

        case 'detailed':
          reportData = transactions.map(t => ({
            日期: t.date,
            描述: t.description,
            分类: t.category,
            金额: t.amount,
            账户: t.account,
            标签: t.tags.join(', '),
          }))
          break

        case 'category':
          const categoryStats = transactions.reduce((acc, t) => {
            if (!acc[t.category]) {
              acc[t.category] = { 收入: 0, 支出: 0 }
            }
            if (t.amount > 0) {
              acc[t.category].收入 += t.amount
            } else {
              acc[t.category].支出 += Math.abs(t.amount)
            }
            return acc
          }, {} as Record<string, { 收入: number; 支出: number }>)

          reportData = Object.entries(categoryStats).map(([category, stats]) => ({
            分类: category,
            收入: stats.收入,
            支出: stats.支出,
            净额: stats.收入 - stats.支出,
          }))
          break

        case 'trend':
          const monthlyStats = transactions.reduce((acc, t) => {
            const month = t.date.substring(0, 7)
            if (!acc[month]) {
              acc[month] = { 收入: 0, 支出: 0 }
            }
            if (t.amount > 0) {
              acc[month].收入 += t.amount
            } else {
              acc[month].支出 += Math.abs(t.amount)
            }
            return acc
          }, {} as Record<string, { 收入: number; 支出: number }>)

          reportData = Object.entries(monthlyStats).map(([month, stats]) => ({
            月份: month,
            收入: stats.收入,
            支出: stats.支出,
            结余: stats.收入 - stats.支出,
          }))
          break
      }

      if (format === 'excel') {
        const wb = XLSX.utils.book_new()
        const ws = XLSX.utils.json_to_sheet(reportData)
        XLSX.utils.book_append_sheet(wb, ws, "报表")
        XLSX.writeFile(wb, `财务报表_${reportType}_${new Date().toISOString().split('T')[0]}.xlsx`)
      } else {
        // PDF 导出逻辑
        console.log('PDF export not implemented yet')
      }
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>生成报表</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">报表类型</label>
                <Select value={reportType} onValueChange={(value: ReportType) => setReportType(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择报表类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="summary">汇总报表</SelectItem>
                    <SelectItem value="detailed">明细报表</SelectItem>
                    <SelectItem value="category">分类统计</SelectItem>
                    <SelectItem value="trend">趋势分析</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">导出格式</label>
                <Select value={format} onValueChange={(value: ReportFormat) => setFormat(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择导出格式" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excel">
                      <div className="flex items-center">
                        <FileSpreadsheet className="mr-2 h-4 w-4" />
                        Excel
                      </div>
                    </SelectItem>
                    <SelectItem value="pdf">
                      <div className="flex items-center">
                        <FileText className="mr-2 h-4 w-4" />
                        PDF
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">时间范围</label>
              <DatePickerWithRange />
            </div>

            <Button 
              onClick={generateReport} 
              disabled={isGenerating}
              className="w-full"
            >
              <Download className="mr-2 h-4 w-4" />
              {isGenerating ? '生成中...' : '生成报表'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 