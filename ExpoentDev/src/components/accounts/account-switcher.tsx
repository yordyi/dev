"use client"

import { useFinanceStore } from "@/stores/finance"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function AccountSwitcher() {
  const { accounts, currentAccount, setCurrentAccount } = useFinanceStore()

  return (
    <Select value={currentAccount} onValueChange={setCurrentAccount}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="选择账户" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">
          <div className="flex items-center">
            <span className="mr-2">🏦</span>
            全部账户
          </div>
        </SelectItem>
        {accounts.map((account) => (
          <SelectItem key={account.id} value={account.id}>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <span className="mr-2">{account.icon}</span>
                {account.name}
              </div>
              <span className={account.balance >= 0 ? "text-green-500" : "text-red-500"}>
                ¥{account.balance.toFixed(2)}
              </span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
} 