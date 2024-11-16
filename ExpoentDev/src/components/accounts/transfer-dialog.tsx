"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFinanceStore } from "@/stores/finance"
import { ArrowRightLeft } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface TransferForm {
  fromAccount: string
  toAccount: string
  amount: number
  description: string
}

const initialForm: TransferForm = {
  fromAccount: '',
  toAccount: '',
  amount: 0,
  description: ''
}

export function TransferDialog() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<TransferForm>(initialForm)
  const { accounts, addTransaction } = useFinanceStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.fromAccount === formData.toAccount) {
      toast({
        title: "验证失败",
        description: "转出和转入账户不能相同",
        variant: "destructive",
      })
      return
    }

    if (formData.amount <= 0) {
      toast({
        title: "验证失败",
        description: "转账金额必须大于0",
        variant: "destructive",
      })
      return
    }

    try {
      // 添加转出交易
      addTransaction({
        id: crypto.randomUUID(),
        date: new Date().toISOString().split('T')[0],
        description: formData.description || '账户转账',
        category: 'transfer',
        amount: -formData.amount,
        account: formData.fromAccount,
        tags: ['转账']
      })

      // 添加转入交易
      addTransaction({
        id: crypto.randomUUID(),
        date: new Date().toISOString().split('T')[0],
        description: formData.description || '账户转账',
        category: 'transfer',
        amount: formData.amount,
        account: formData.toAccount,
        tags: ['转账']
      })

      setFormData(initialForm)
      setOpen(false)
      
      toast({
        title: "转账成功",
        description: "账户转账已完成",
      })
    } catch (error) {
      toast({
        title: "转账失败",
        description: error instanceof Error ? error.message : "未知错误",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <ArrowRightLeft className="h-4 w-4" />
          账户转账
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>账户转账</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>转出账户</Label>
            <Select
              value={formData.fromAccount}
              onValueChange={(value) => setFormData(prev => ({ ...prev, fromAccount: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="选择转出账户" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    <div className="flex items-center">
                      <span className="mr-2">{account.icon}</span>
                      {account.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>转入账户</Label>
            <Select
              value={formData.toAccount}
              onValueChange={(value) => setFormData(prev => ({ ...prev, toAccount: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="选择转入账户" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    <div className="flex items-center">
                      <span className="mr-2">{account.icon}</span>
                      {account.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>转账金额</Label>
            <Input
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: parseFloat(e.target.value) }))}
            />
          </div>

          <div className="space-y-2">
            <Label>转账说明</Label>
            <Input
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="可选"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              取消
            </Button>
            <Button type="submit">确认转账</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 