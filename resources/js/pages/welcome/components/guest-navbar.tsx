import AppLogo from '@/components/app-logo';
import ThemeToggler from '@/components/theme-toggler';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { NavItem, SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LogIn, Monitor } from 'lucide-react';

const guestMainNav: NavItem[] = [];

const GuestNavbar = () => {
  const { user } = usePage<SharedData>().props.auth;

  return (
    <Card className="z-10 w-full rounded-none border-0">
      <CardContent className="flex items-center justify-between">
        <Link href={route('home')} className="flex items-center gap-2">
          <AppLogo />
        </Link>

        <div className="flex md:hidden">
          <SidebarTrigger />
        </div>

        <div className="hidden gap-2 md:flex">
          {guestMainNav.map((gn, index) => (
            <Button variant={'ghost'} key={index} asChild>
              <Link href={gn.href}>
                {gn.icon && <gn.icon />}
                {gn.title}
              </Link>
            </Button>
          ))}

          {!user ? (
            <>
              <Button variant={'ghost'} asChild>
                <Link href={route('login')}>
                  <LogIn />
                  Masuk aplikasi
                </Link>
              </Button>
              {/* <Button variant={'ghost'} asChild>
                <Link href={route('register')}>
                  <UserPlus />
                  Register
                </Link>
              </Button> */}
            </>
          ) : (
            <Button variant={'ghost'} asChild>
              <Link href={route('dashboard')}>
                <Monitor />
                Dashboard
              </Link>
            </Button>
          )}
          <Button children="|" size={'icon'} disabled variant={'ghost'} />
          <ThemeToggler />
        </div>
      </CardContent>
    </Card>
  );
};

export default GuestNavbar;
