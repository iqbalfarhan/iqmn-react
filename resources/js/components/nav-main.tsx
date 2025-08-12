import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Avatar, AvatarFallback } from './ui/avatar';

export function NavMain({ items = [], label }: { items: NavItem[]; label?: string }) {
  const page = usePage();
  return (
    <SidebarGroup className="px-2 py-0">
      {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild isActive={page.url.startsWith(item.href)} tooltip={{ children: item.title }}>
              <Link href={item.href} prefetch>
                {item.icon && <item.icon />}
                {item.alias && (
                  <Avatar className="size-4 rounded-xs">
                    <AvatarFallback className="rounded-xs bg-primary text-primary-foreground">{item.alias}</AvatarFallback>
                  </Avatar>
                )}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
            {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
