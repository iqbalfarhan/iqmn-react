import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Review } from '@/types';
import { Star } from 'lucide-react';
import { FC } from 'react';
import SectionContainer from '../components/section-container';

type Props = {
  reviews: Review[];
};

const ReviewSection: FC<Props> = ({ reviews }) => {
  return (
    <SectionContainer
      title="Review dari anggota kelas"
      description="Penasaran gimana pengalaman orang lain pake .IQMN? Nih, suara asli dari para pengguna setia yang udah ngerasain manfaatnya!."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {reviews.map((review, index) => (
          <div key={index} className="flex flex-col items-center justify-start space-y-4">
            <Avatar className="size-28 bg-primary">
              <AvatarImage src={review.user.avatar} />
            </Avatar>
            <h4 className="text-xl font-semibold">{review.user.name}</h4>
            <q className="line-clamp-3 w-80 text-center text-muted-foreground italic">{review.comment}</q>

            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={i < review.rating ? 'fill-yellow-500 stroke-yellow-500' : 'fill-muted stroke-muted'} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default ReviewSection;
