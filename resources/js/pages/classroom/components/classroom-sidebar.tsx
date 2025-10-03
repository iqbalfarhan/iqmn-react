import { NavMain } from '@/components/nav-main';
import { SidebarContent } from '@/components/ui/sidebar';
import { Classroom } from '@/types/classroom';
import { ArrowLeft, BookOpen, IdCard, Settings2, TableIcon, Users } from 'lucide-react';
import { FC } from 'react';

type Props = {
  classroom: Classroom;
};

const ClassroomSidebar: FC<Props> = ({ classroom }) => {
  return (
    <SidebarContent className="space-y-4">
      <NavMain
        items={[
          {
            title: 'Back to Dashboard',
            href: route('dashboard'),
            icon: ArrowLeft,
          },
        ]}
        label="Classroom"
      />
      <NavMain
        label={classroom.name}
        items={[
          {
            title: 'Overview',
            href: route('classroom.overview', classroom.id),
            icon: BookOpen,
          },
          {
            title: 'Materials',
            href: route('classroom.materials', classroom.id),
            icon: IdCard,
          },
          {
            title: 'Assignments',
            href: route('classroom.assignments', classroom.id),
            icon: BookOpen,
          },
          {
            title: 'Scores',
            href: route('classroom.scores', classroom.id),
            icon: TableIcon,
          },
          {
            title: 'Members',
            href: route('classroom.members', classroom.id),
            icon: Users,
          },
          {
            title: 'Settings',
            href: route('classroom.edit', classroom.id),
            icon: Settings2,
          },
        ]}
      />
    </SidebarContent>
  );
};

export default ClassroomSidebar;
