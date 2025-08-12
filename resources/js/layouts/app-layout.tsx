import Heading from '@/components/heading';
import { Toaster } from '@/components/ui/sonner';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { PropsWithChildren, type ReactNode } from 'react';

export type AppLayoutProps = {
  title?: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
};

type Props = PropsWithChildren & AppLayoutProps;

export default ({
  children,
  breadcrumbs = [
    {
      title: 'Dashboard',
      href: route('dashboard'),
    },
  ],
  title = 'Page Heading',
  description = 'Desripsi halaman',
  actions,
}: Props) => (
  <AppLayoutTemplate breadcrumbs={breadcrumbs}>
    <Head title={title} />
    <div className="flex h-full flex-1 flex-col gap-4 space-y-4 overflow-x-auto rounded-xl p-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row">
        <Heading title={title} description={description} />
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-y-6">{children}</div>
      {/* {children} */}
    </div>
    <Toaster position="top-center" />
  </AppLayoutTemplate>
);
