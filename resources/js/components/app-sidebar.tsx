import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import ClassroomSidebar from '@/pages/classroom/components/classroom-sidebar';
import { type NavItem } from '@/types';
import { Classroom } from '@/types/classroom';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Database, KeySquare, LayoutGrid, Settings, Users } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: route('dashboard'),
    icon: LayoutGrid,
  },
  {
    title: 'Documentation',
    href: route('documentation'),
    icon: BookOpen,
  },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
  const { menus, classroom } = usePage<{ menus: Record<string, boolean>; classroom?: Classroom }>().props;
  // configure menus "available" in HandleInertiaRequest.php

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard" prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {classroom ? (
        <ClassroomSidebar classroom={classroom} />
      ) : (
        <SidebarContent className="space-y-4">
          <NavMain
            items={[
              ...mainNavItems,
              // {
              //   title: 'feature',
              //   href: route('feature.index'),
              //   icon: BookOpen,
              //   available: menus.feature,
              // },
            ]}
            label="Dashboard"
          />
          <NavMain
            items={[
              {
                title: 'Classroom lists',
                href: route('classroom.index'),
                icon: BookOpen,
                available: menus.classroom,
              },
              {
                title: 'User management',
                href: route('user.index'),
                icon: Users,
                available: menus.user,
              },
              {
                title: 'Role & permission',
                href: route('role.index'),
                icon: KeySquare,
                available: menus.role,
              },
              {
                title: 'Adminer database',
                href: '/adminer',
                icon: Database,
                available: menus.adminer,
              },
              {
                title: 'Pengaturan profile',
                href: '',
                icon: Settings,
                items: [
                  {
                    title: 'Edit profile',
                    href: route('profile.edit'),
                  },
                  {
                    title: 'Ganti password',
                    href: route('password.edit'),
                  },
                  {
                    title: 'Appearance',
                    href: route('appearance'),
                  },
                ],
              },
            ]}
            label="Settings"
          />
        </SidebarContent>
      )}

      <SidebarFooter>
        <NavFooter items={footerNavItems} className="mt-auto" />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
