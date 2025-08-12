import { Stat } from '@/types';
import { FC } from 'react';
import SectionContainer from '../components/section-container';

type Props = {
  statuses: Stat[];
};

const StatusSection: FC<Props> = ({ statuses }) => {
  return (
    <SectionContainer title="Status pencapaian" description="Gak nyangka sih, sejauh ini udah keren banget! Yuk intip angka-angkanya">
      <div className="grid grid-cols-2 gap-6 xl:grid-cols-4">
        {statuses.map((stat, index) => (
          <div className="mx-auto flex w-48 flex-col items-center justify-center space-y-4 text-center" key={index}>
            <h1 className="text-6xl font-bold">{stat.number}</h1>
            <div>
              <h2>{stat.label}</h2>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default StatusSection;
