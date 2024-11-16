import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { AssetOverview } from "@/components/assets/asset-overview"
import { AssetAllocation } from "@/components/assets/asset-allocation"
import { AssetsList } from "@/components/assets/assets-list"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function AssetsPage() {
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">资产管理</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          添加资产
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-7 mb-4">
        <div className="col-span-4">
          <AssetOverview />
        </div>
        <div className="col-span-3">
          <AssetAllocation />
        </div>
      </div>

      <div className="mt-6">
        <AssetsList />
      </div>
    </DashboardLayout>
  )
}