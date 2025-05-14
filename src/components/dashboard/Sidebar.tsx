import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Calendar,
  CreditCard,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarProps {
  className?: string;
  collapsed?: boolean;
  onToggle?: () => void;
}

const Sidebar = ({ className, collapsed = false, onToggle }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
    if (onToggle) onToggle();
  };

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/" },
    { icon: <Users size={20} />, label: "Contacts", path: "/contacts" },
    { icon: <Calendar size={20} />, label: "Activities", path: "/activities" },
    { icon: <FileText size={20} />, label: "Documents", path: "/documents" },
    { icon: <CreditCard size={20} />, label: "Payments", path: "/payments" },
    { icon: <Settings size={20} />, label: "Settings", path: "/settings" },
    { icon: <HelpCircle size={20} />, label: "Help", path: "/help" },
  ];

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-background border-r transition-all duration-300 relative",
        isCollapsed ? "w-[70px]" : "w-[280px]",
        className,
      )}
    >
      {/* Mobile toggle button - visible only on small screens */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-[-40px] top-4 md:hidden"
        onClick={handleToggle}
      >
        <Menu size={20} />
      </Button>

      {/* Logo */}
      <div
        className={cn(
          "flex items-center h-16 px-4 border-b",
          isCollapsed ? "justify-center" : "justify-between",
        )}
      >
        {!isCollapsed && <h1 className="font-bold text-xl">CRM Pro</h1>}
        {isCollapsed && <span className="font-bold text-xl">CP</span>}

        {/* Desktop toggle button - hidden on small screens */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggle}
          className="hidden md:flex"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map((item, index) => (
            <li key={index}>
              {isCollapsed ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.path}
                        className="flex justify-center items-center h-10 w-full rounded-md hover:bg-accent transition-colors"
                      >
                        {item.icon}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">{item.label}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <Link
                  to={item.path}
                  className="flex items-center h-10 px-3 rounded-md hover:bg-accent transition-colors"
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* User profile section */}
      <div
        className={cn(
          "border-t p-4",
          isCollapsed ? "flex justify-center" : "flex items-center",
        )}
      >
        {isCollapsed ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                    alt="User"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex flex-col gap-1">
                <p className="font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">
                  john@example.com
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <>
            <Avatar className="mr-3">
              <AvatarImage
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                alt="User"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="font-medium truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">
                john@example.com
              </p>
            </div>
            <Button variant="ghost" size="icon" className="ml-2">
              <LogOut size={18} />
            </Button>
          </>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
