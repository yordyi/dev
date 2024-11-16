"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFinanceStore } from "@/stores/finance"
import { PlusCircle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface AccountForm {
  id: string
  name: string
  type: 'bank' | 'cash' | 'alipay' | 'wechat' | 'other'
  icon?: string
}

const defaultIcons = {
  bank: '🏦',
  cash: '💵',
  alipay: '💰',
  wechat: '💳',
  other: '💴'
}

interface AccountDialogProps {
  mode: 'add' | 'edit'
  account?: AccountForm
  trigger?: React.ReactNode
}

export function AccountDialog({ mode, account, trigger }: AccountDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<AccountForm>(
    account || {
      id: crypto.randomUUID(),
      name: '',
      type: 'bank',
      icon: defaultIcons.bank
    }
  )

  const { addAccount, updateAccount } = useFinanceStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      toast({
        title: "验证失败",
        description: "账户名称不能为空",
        variant: "destructive",
      })
      return
    }

    try {
      if (mode === 'add') {
        addAccount(formData)
        toast({
          title: "添加成功",
          description: "新账户已创建",
        })
      } else {
        updateAccount(formData.id, formData)
        toast({
          title: "更新成功",
          description: "账户信息已更新",
        })
      }
      setOpen(false)
    } catch (error) {
      toast({
        title: "操作失败",
        description: error instanceof Error ? error.message : "未知错误",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            添加账户
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? '添加账户' : '编辑账户'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>账户名称</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="输入账户名称"
            />
          </div>

          <div className="space-y-2">
            <Label>账户类型</Label>
            <Select
              value={formData.type}
              onValueChange={(value: AccountForm['type']) => {
                setFormData(prev => ({
                  ...prev,
                  type: value,
                  icon: defaultIcons[value]
                }))
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="选择账户类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank">银行卡</SelectItem>
                <SelectItem value="cash">现金</SelectItem>
                <SelectItem value="alipay">支付宝</SelectItem>
                <SelectItem value="wechat">微信</SelectItem>
                <SelectItem value="other">其他</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>账户图标</Label>
            <Input
              value={formData.icon}
              onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
              placeholder="输入图标 emoji"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              取消
            </Button>
            <Button type="submit">
              {mode === 'add' ? '添加' : '保存'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 