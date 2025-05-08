"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Image, 
  LayoutDashboard, 
  FileText, 
  Settings, 
  LogOut 
} from "lucide-react"
import { useRouter } from "next/navigation"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }
  
  return (
    <div className={cn("pb-12 border-r h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Admin Dashboard
          </h2>
          <div className="space-y-1">
            <Button 
              variant={pathname === "/admin/dashboard" ? "secondary" : "ghost"} 
              className="w-full justify-start"
              asChild
            >
              <Link href="/admin/dashboard">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
          </div>
        </div>
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Content
          </h2>
          <div className="space-y-1">
            <Button 
              variant={pathname === "/admin/gallery" ? "secondary" : "ghost"} 
              className="w-full justify-start"
              asChild
            >
              <Link href="/admin/gallery">
                <Image className="mr-2 h-4 w-4" />
                Gallery
              </Link>
            </Button>
            <Button 
              variant={pathname === "/admin/articles" ? "secondary" : "ghost"} 
              className="w-full justify-start"
              asChild
            >
              <Link href="/admin/articles">
                <FileText className="mr-2 h-4 w-4" />
                Articles
              </Link>
            </Button>
          </div>
        </div>
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Settings
          </h2>
          <div className="space-y-1">
            <Button 
              variant={pathname === "/admin/settings" ? "secondary" : "ghost"} 
              className="w-full justify-start"
              asChild
            >
              <Link href="/admin/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100/10"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 