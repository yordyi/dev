"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { useFinanceStore } from "@/stores/finance"
import * as XLSX from 'xlsx'
import type { Transaction } from "@/stores/finance"
import { toast } from "@/components/ui/use-toast"

export function ImportButton() {
  const [isImporting, setIsImporting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { addTransaction } = useFinanceStore()

  const validateTransaction = (data: any): data is Transaction => {
    return (
      typeof data.date === 'string' &&
      typeof data.description === 'string' &&
      typeof data.category === 'string' &&
      typeof data.amount === 'number' &&
      typeof data.account === 'string' &&
      Array.isArray(data.tags)
    )
  }

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsImporting(true)
    try {
      const data = await file.arrayBuffer()
      const workbook = XLSX.read(data)
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]
      const jsonData = XLSX.utils.sheet_to_json(worksheet)

      const transactions: Transaction[] = []
      const errors: string[] = []

      jsonData.forEach((row: any, index) => {
        try {
          const transaction = {
            id: crypto.randomUUID(),
            date: row['日期'],
            description: row['描述'],
            category: row['分类'],
            amount: parseFloat(row['金额']),
            account: row['账户'],
            tags: (row['标签'] || '').split(',').map((tag: string) => tag.trim()).filter(Boolean)
          }

          if (validateTransaction(transaction)) {
            transactions.push(transaction)
          } else {
            errors.push(`第 ${index + 1} 行数据格式错误`)
          }
        } catch (error) {
          errors.push(`第 ${index + 1} 行数据处理失败`)
        }
      })

      if (errors.length > 0) {
        toast({
          title: "导入部分失败",
          description: (
            <div className="mt-2 text-sm">
              {errors.map((error, i) => (
                <div key={i} className="text-red-500">{error}</div>
              ))}
            </div>
          ),
          variant: "destructive",
        })
      }

      if (transactions.length > 0) {
        transactions.forEach(addTransaction)
        toast({
          title: "导入成功",
          description: `成功导入 ${transactions.length} 条交易记录`,
        })
      }
    } catch (error) {
      toast({
        title: "导入失败",
        description: "文件处理失败，请检查文件格式是否正确",
        variant: "destructive",
      })
    } finally {
      setIsImporting(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".xlsx,.xls,.csv"
        onChange={handleImport}
      />
      <Button 
        variant="outline" 
        onClick={() => fileInputRef.current?.click()}
        disabled={isImporting}
        className="gap-2"
      >
        <Upload className="h-4 w-4" />
        {isImporting ? '导入中...' : '导入'}
      </Button>
    </>
  )
} 