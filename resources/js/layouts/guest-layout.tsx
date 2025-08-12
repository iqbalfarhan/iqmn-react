import { ScrollArea } from '@/components/ui/scroll-area';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import GuestNavbar from '@/pages/welcome/components/guest-navbar';
import GuestSidebar from '@/pages/welcome/components/guest-sidebar';
import FooterSection from '@/pages/welcome/sections/footer-section';
import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren;

const GuestLayout: FC<Props> = ({ children }) => {
  return (
    <SidebarProvider defaultOpen={false}>
      <GuestSidebar />
      <SidebarInset>
        <ScrollArea className="h-screen overflow-auto">
          <GuestNavbar />
          <div>{children}</div>

          <FooterSection />
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default GuestLayout;
