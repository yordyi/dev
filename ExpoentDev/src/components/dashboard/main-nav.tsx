import Link from "next/link"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "仪表盘",
    href: "/dashboard",
  },
  {
    title: "交易",
    href: "/dashboard/transactions",
  },
  {
    title: "预算",
    href: "/dashboard/budget",
  },
  {
    title: "资产",
    href: "/dashboard/assets",
  },
  {
    title: "报表",
    href: "/dashboard/reports",
  },
]

export function MainNav() {
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            "text-muted-foreground"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}