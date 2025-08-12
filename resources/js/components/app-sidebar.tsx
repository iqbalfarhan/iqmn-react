import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { usePageProps } from '@/hooks/use-page-props';
import { strLimit } from '@/lib/utils';
import { Group, SharedData, type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, CalendarDays, LayoutGrid, Lock, MessageCircle, Search, User, Users, Wallet } from 'lucide-react';
import AppLogo from './app-logo';
import { ScrollArea } from './ui/scroll-area';

const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: route('dashboard'),
    icon: LayoutGrid,
  },
  {
    title: 'Explore group',
    href: route('dashboard.explore'),
    icon: Search,
  },
];

const settingNavItems: NavItem[] = [
  {
    title: 'Pengaturan user',
    href: route('user.index'),
    icon: Users,
  },
  {
    title: 'Pembayaran user',
    href: route('pembayaran.index'),
    icon: Wallet,
  },
  {
    title: 'Pengaturan group',
    href: route('group.index'),
    icon: CalendarDays,
  },
  // {
  //   title: 'Materi belajar',
  //   href: route('material.index'),
  //   icon: Book,
  // },
  // {
  //   title: 'Tugas dan ujian',
  //   href: route('tugas.index'),
  //   icon: BookOpenCheck,
  // },
  {
    title: 'Role & permissions',
    href: route('role.index'),
    icon: Lock,
  },
];

const footerNavItems: NavItem[] = [
  {
    title: 'Edit Profile',
    href: route('profile.edit'),
    icon: User,
  },
];

export function AppSidebar() {
  const {
    name,
    following,
    auth: { roles, tugas_count, permissions, unpaid },
  } = usePageProps<SharedData & { following: Group[] }>();

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/" prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <ScrollArea className="flex-1 overflow-y-auto">
        <SidebarContent>
          <NavMain
            items={[
              ...mainNavItems,
              ...(unpaid > 0
                ? [
                    {
                      title: 'Pembayaran',
                      href: route('dashboard.pembayaran'),
                      icon: Wallet,
                      badge: unpaid.toString(),
                    },
                  ]
                : []),
              ...(permissions.includes('upload jawaban') && tugas_count > 0
                ? [
                    {
                      title: 'Tugas kelas',
                      href: route('dashboard.daftar-tugas'),
                      icon: BookOpen,
                      badge: tugas_count.toString(),
                    },
                  ]
                : []),
            ]}
            label="Dashboard"
          />
          {roles.includes('superadmin') && <NavMain items={settingNavItems} label="Settings" />}
          {following.length > 0 && (
            <NavMain
              items={following.map((group: Group) => ({
                title: strLimit(group.name, 25),
                href: route('group.show', group.id),
                alias: group.name.charAt(0).toUpperCase(),
              }))}
              label="Following groups"
            />
          )}
          <NavMain
            label="Pengaturan"
            items={[
              ...footerNavItems,
              {
                title: `Review ${strLimit(name)}`,
                href: route('review'),
                icon: MessageCircle,
              },
            ]}
          />
        </SidebarContent>
      </ScrollArea>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
