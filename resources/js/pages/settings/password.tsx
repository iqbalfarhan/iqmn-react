import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Pengaturan user',
    href: route('profile.edit'),
  },
  {
    title: 'Password settings',
    href: '/settings/password',
  },
];

export default function Password() {
  const passwordInput = useRef<HTMLInputElement>(null);
  const currentPasswordInput = useRef<HTMLInputElement>(null);

  const { data, setData, put, reset, processing, recentlySuccessful } = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const updatePassword: FormEventHandler = (e) => {
    e.preventDefault();

    put(route('password.update'), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: (errors) => {
        if (errors.password) {
          reset('password', 'password_confirmation');
          passwordInput.current?.focus();
        }

        if (errors.current_password) {
          reset('current_password');
          currentPasswordInput.current?.focus();
        }
      },
    });
  };

  return (
    <SettingsLayout
      breadcrumbs={breadcrumbs}
      title="Update password"
      description="Ensure your account is using a long, random password to stay secure"
    >
      <div className="space-y-6">
        <form onSubmit={updatePassword} className="space-y-6">
          <FormControl label="Password sekarang">
            <Input
              ref={currentPasswordInput}
              value={data.current_password}
              onChange={(e) => setData('current_password', e.target.value)}
              type="password"
              placeholder="Current password"
            />
          </FormControl>

          <FormControl label="Password">
            <Input
              ref={passwordInput}
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              type="password"
              placeholder="New password"
            />
          </FormControl>

          <FormControl label="Konfirmasi password">
            <Input
              value={data.password_confirmation}
              onChange={(e) => setData('password_confirmation', e.target.value)}
              type="password"
              placeholder="Confirm password"
            />
          </FormControl>

          <div className="flex items-center gap-4">
            <Button disabled={processing}>Save password</Button>

            <Transition
              show={recentlySuccessful}
              enter="transition ease-in-out"
              enterFrom="opacity-0"
              leave="transition ease-in-out"
              leaveTo="opacity-0"
            >
              <p className="text-sm text-neutral-600">Saved</p>
            </Transition>
          </div>
        </form>
      </div>
    </SettingsLayout>
  );
}
