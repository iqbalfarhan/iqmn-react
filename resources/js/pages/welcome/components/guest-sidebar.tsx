import ThemeToggler from '@/components/theme-toggler';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Globe, Lock, X } from 'lucide-react';

const guestMainNav: NavItem[] = [
  {
    title: 'Halaman awal',
    href: route('home'),
    icon: Globe,
  },
  {
    title: 'Masuk',
    href: route('login'),
    icon: Lock,
  },
];

const GuestSidebar = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row items-center justify-between p-4">
        <div />
        <Button variant={'ghost'} size={'icon'} onClick={toggleSidebar}>
          <X />
        </Button>
      </SidebarHeader>
      <SidebarContent className="items-center justify-center p-4">
        <Avatar className="size-32">
          <AvatarImage src="https://avatars.githubusercontent.com/u/53584619?s=400&u=02d4deb1c42e0bad6132223f5b9a2e28dfc44ee3&v=4" />
        </Avatar>
        <div className="text-center">
          <h1>Iqbal farhan syuhada</h1>
          <p className="text-xs">Fullstack web programmer</p>
        </div>
      </SidebarContent>
      <SidebarContent className="p-4">
        <SidebarMenu>
          {guestMainNav.map((gn, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton asChild>
                <Link href={gn.href}>
                  {gn.icon && <gn.icon />}
                  {gn.title}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <ThemeToggler />
      </SidebarFooter>
    </Sidebar>
  );
};

export default GuestSidebar;
