"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useFinanceStore } from "@/stores/finance"
import { AccountDialog } from "./account-dialog"
import { Button } from "@/components/ui/button"
import { Edit2, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"

export function AccountList() {
  const { accounts, deleteAccount } = useFinanceStore()
  const [accountToDelete, setAccountToDelete] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    try {
      deleteAccount(id)
      toast({
        title: "删除成功",
        description: "账户已删除",
      })
    } catch (error) {
      toast({
        title: "删除失败",
        description: error instanceof Error ? error.message : "未知错误",
        variant: "destructive",
      })
    }
    setAccountToDelete(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>账户列表</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {accounts.map((account) => (
            <Card key={account.id} className="relative overflow-hidden">
              <div className="absolute right-2 top-2 flex gap-1">
                <AccountDialog
                  mode="edit"
                  account={account}
                  trigger={
                    <Button size="icon" variant="ghost">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  }
                />
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="text-red-500 hover:text-red-600"
                  onClick={() => setAccountToDelete(account.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{account.icon}</span>
                  <CardTitle className="text-base">{account.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">
                    账户类型：{account.type}
                  </div>
                  <div className={`text-xl font-bold ${account.balance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    ¥{account.balance.toFixed(2)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>

      <AlertDialog open={!!accountToDelete} onOpenChange={() => setAccountToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除账户？</AlertDialogTitle>
            <AlertDialogDescription>
              此操作不可撤销。删除账户将同时删除与该账户相关的所有交易记录。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={() => accountToDelete && handleDelete(accountToDelete)}
            >
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
} 