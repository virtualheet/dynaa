"use client";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Bot,
  Presentation,
  CreditCard,
  Plus,
  ChevronLeft
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import useProject from "@/hooks/use-projects";

const items = [
  {
    label: "Home",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Q&B",
    href: "/qa",
    icon: Bot,
  },
  {
    label: "Meetings",
    href: "/meetings",
    icon: Presentation,
  },
  {
    label: "Billings",
    href: "/billings",
    icon: CreditCard,
  },
];

const AppSidebar = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { projects, projectId, setProjectId } = useProject();

  return (
    <div className="bg-black border-r border-white/5 rounded-3xl transition-all duration-300"
      style={{
        width: isCollapsed ? 'clamp(4rem, 5vw, 5rem)' : 'clamp(16rem, 20vw, 20rem)'
      }}
    >
      <div className="flex flex-col h-full p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            {!isCollapsed && (
              <h1 className="text-xl font-bold text-white">Dyna</h1>
            )}
          </div>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-white/70 hover:text-white transition-colors"
          >
            <ChevronLeft className={cn(
              "w-5 h-5 transition-transform duration-300",
              isCollapsed && "rotate-180"
            )} />
          </button>
        </div>

        {/* Navigation */}
        <div className="space-y-8">
          {/* Main Menu */}
          <div>
            <h2 className={cn(
              "text-xs text-white/50 font-medium px-3 mb-3",
              isCollapsed && "opacity-0"
            )}>
              Application
            </h2>
            <nav className="space-y-1">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-2xl text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors",
                    pathname === item.href && "bg-white/10 text-white",
                  )}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              ))}
            </nav>
          </div>

          {/* Projects */}
          <div>
            <h2 className={cn(
              "text-xs text-white/50 font-medium px-3 mb-3",
              isCollapsed && "opacity-0"
            )}>
              Your Projects
            </h2>
            <div className="space-y-1">
              {projects?.map((project) => (
                <Link
                key={project.id}
                href={'/dashboard'}>
                <button
                  onClick={() => setProjectId(project.id)}
                  className={cn(
                    "flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors",
                    project.id === projectId && "bg-white/10 text-white"
                  )}
                >
                  <div className={cn(
                    "flex items-center justify-center w-6 h-6 rounded-lg   border border-white/10  text-white",
                    project.id === projectId && "bg-white/20"
                  )}>
                    {project.name[0]}
                  </div>
                  {!isCollapsed && <span>{project.name}</span>}
                </button>
                </Link>
              ))}

              <Link
                href="/create"
                className="flex items-center gap-3 px-3 py-2 mt-4 rounded-2xl text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Plus className="w-5 h-5" />
                {!isCollapsed && <span>Create Project</span>}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppSidebar;
