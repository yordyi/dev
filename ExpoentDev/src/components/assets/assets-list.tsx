"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, TrendingUp, TrendingDown } from "lucide-react"

const assets = [
  {
    id: "1",
    name: "招商银行储蓄卡",
    type: "现金",
    value: 20000,
    return: 2.5,
    trend: "up",
    risk: "低",
  },
  {
    id: "2",
    name: "沪深300指数基金",
    type: "基金",
    value: 15000,
    return: 8.5,
    trend: "up",
    risk: "中",
  },
  {
    id: "3",
    name: "腾讯控股",
    type: "股票",
    value: 25000,
    return: -3.2,
    trend: "down",
    risk: "高",
  },
  {
    id: "4",
    name: "国债",
    type: "债券",
    value: 8000,
    return: 3.8,
    trend: "up",
    risk: "低",
  },
]

export function AssetsList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">资产明细</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>资产名称</TableHead>
              <TableHead>类型</TableHead>
              <TableHead className="text-right">当前市值</TableHead>
              <TableHead className="text-right">收益率</TableHead>
              <TableHead>风险等级</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.map((asset) => (
              <TableRow key={asset.id}>
                <TableCell>{asset.name}</TableCell>
                <TableCell>{asset.type}</TableCell>
                <TableCell className="text-right">¥{asset.value.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-1">
                    {asset.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={asset.return > 0 ? "text-green-500" : "text-red-500"}>
                      {asset.return > 0 ? "+" : ""}{asset.return}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={
                    asset.risk === "低" ? "secondary" : 
                    asset.risk === "中" ? "warning" : 
                    "destructive"
                  }>
                    {asset.risk}风险
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>查看详情</DropdownMenuItem>
                      <DropdownMenuItem>编辑</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">删除</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}