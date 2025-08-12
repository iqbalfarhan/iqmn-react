import GuestLayout from '@/layouts/guest-layout';
import { Review, Stat } from '@/types';
import { FC } from 'react';
import HeroSection from './sections/hero-section';
import ReviewSection from './sections/review-section';
import StatusSection from './sections/status-section';

type Props = {
  reviews: Review[];
  statuses: Stat[];
};

const MainWelcome: FC<Props> = ({ reviews, statuses }) => {
  return (
    <GuestLayout>
      <HeroSection />
      <StatusSection statuses={statuses} />
      <ReviewSection reviews={reviews} />
    </GuestLayout>
  );
};

export default MainWelcome;
