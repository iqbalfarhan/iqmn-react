import { Head, Link, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import FormControl from '@/components/form-control';
import GithubSvg from '@/components/svgs/github-svg';
import GoogleSvg from '@/components/svgs/google-svg';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
  email: string;
  password: string;
  remember: boolean;
};

interface LoginProps {
  status?: string;
  canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
  const [socialite, setSocialite] = useState(true);

  const { data, setData, post, processing, reset } = useForm<Required<LoginForm>>({
    email: '',
    password: '',
    remember: false,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('login'), {
      onFinish: () => reset('password'),
    });
  };

  return (
    <AuthLayout title="Log in to your account" description="Login dengan akun social media kamu">
      <Head title="Log in" />

      {socialite ? (
        <div className="grid gap-2">
          <Button type="button" variant={'google'} className="w-full" asChild>
            <a href={route('google.redirect')}>
              <GoogleSvg />
              Masuk dengan Google
            </a>
          </Button>
          <Button type="button" variant={'github'} className="w-full" asChild>
            <a href={route('github.redirect')}>
              <GithubSvg />
              Masuk dengan Github
            </a>
          </Button>
          <Label className="hidden h-9 items-center justify-start gap-3">
            <Checkbox checked={socialite} onClick={() => setSocialite(!socialite)} />
            <span>Login dengan email dan password</span>
          </Label>
        </div>
      ) : (
        <form className="flex flex-col gap-6" onSubmit={submit}>
          <div className="grid gap-6">
            <FormControl label="Email address">
              <Input
                type="email"
                required
                autoComplete="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                placeholder="email@example.com"
              />
            </FormControl>
            <FormControl
              label="Password"
              action={
                <>
                  {canResetPassword && (
                    <Link href={route('password.request')} className="ml-auto text-xs" tabIndex={5}>
                      Forgot password?
                    </Link>
                  )}
                </>
              }
            >
              <Input type="password" required value={data.password} onChange={(e) => setData('password', e.target.value)} placeholder="Password" />
            </FormControl>

            <div className="flex items-center space-x-3">
              <Checkbox id="remember" name="remember" checked={data.remember} onClick={() => setData('remember', !data.remember)} tabIndex={3} />
              <Label htmlFor="remember">Remember me</Label>
            </div>

            <div className="flex flex-col gap-2">
              <Button type="submit" disabled={processing}>
                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                Log in
              </Button>
            </div>
          </div>
        </form>
      )}
      <div className="cursor-pointer text-center text-sm text-muted-foreground" onClick={() => setSocialite(!socialite)}>
        Mau login pakai {socialite ? 'email dan password' : 'social media'}?
      </div>

      {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
    </AuthLayout>
  );
}
