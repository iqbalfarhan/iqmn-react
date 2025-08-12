import TeachingSvg from '@/components/svgs/teaching-svg';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { LogIn } from 'lucide-react';
import SectionContainer from '../components/section-container';

const HeroSection = () => {
  return (
    <SectionContainer>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-10">
          <h1 className="text-6xl font-extrabold">Hallo,</h1>
          <p className="text-lg">
            .IQMN adalah aplikasi untuk sharing materi belajar secara terpusat dari pengajar ke pelajar. Semua materi tersimpan rapi dan mudah
            diakses, bikin belajar jadi lebih efisien dan terstruktur.
          </p>
          <div className="flex flex-col gap-4 md:flex-row">
            <Button size={'xl'} variant={'secondary'} asChild>
              <Link href={route('dashboard')}>
                Masuk member <LogIn />
              </Link>
            </Button>
          </div>
        </div>
        <div className="hidden md:flex">
          <TeachingSvg className="aspect-video" />
        </div>
      </div>
    </SectionContainer>
  );
};

export default HeroSection;
