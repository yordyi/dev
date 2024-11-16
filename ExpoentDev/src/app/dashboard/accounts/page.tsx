import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { AccountDialog } from "@/components/accounts/account-dialog"
import { TransferDialog } from "@/components/accounts/transfer-dialog"
import { AccountChart } from "@/components/accounts/account-chart"
import { AccountList } from "@/components/accounts/account-list"
import { AccountStats } from "@/components/accounts/account-stats"

export default function AccountsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">账户管理</h2>
          <div className="flex gap-2">
            <TransferDialog />
            <AccountDialog mode="add" />
          </div>
        </div>

        <AccountStats />
        
        <div className="grid gap-4 md:grid-cols-2">
          <AccountChart />
          <AccountList />
        </div>
      </div>
    </DashboardLayout>
  )
} 