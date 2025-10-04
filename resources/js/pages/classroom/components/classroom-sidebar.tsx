import { NavMain } from '@/components/nav-main';
import { SidebarContent } from '@/components/ui/sidebar';
import { Classroom } from '@/types/classroom';
import { usePage } from '@inertiajs/react';
import { ArrowLeft, BookOpen, IdCard, Settings2, TableIcon, Users } from 'lucide-react';
import { FC } from 'react';

type Props = {
  classroom: Classroom;
};

const ClassroomSidebar: FC<Props> = ({ classroom }) => {
  const { menus } = usePage<{ menus: Record<string, boolean> }>().props;

  return (
    <SidebarContent className="space-y-4">
      <NavMain
        className="mt-4"
        items={[
          {
            title: 'Back to dashboard',
            href: route('dashboard'),
            icon: ArrowLeft,
          },
        ]}
      />
      <NavMain
        label={classroom.name}
        items={[
          {
            title: 'Overview',
            href: route('classroom.overview', classroom.id),
            icon: BookOpen,
            available: menus?.classroomOverview,
          },
          {
            title: 'Materials',
            href: route('classroom.materials', classroom.id),
            icon: IdCard,
            available: menus?.material,
          },
          {
            title: 'Assignments',
            href: route('classroom.assignments', classroom.id),
            icon: BookOpen,
            available: menus?.assignment,
          },
          {
            title: 'Scores',
            href: route('classroom.scores', classroom.id),
            icon: TableIcon,
            available: menus?.score,
          },
          {
            title: 'Members',
            href: route('classroom.members', classroom.id),
            icon: Users,
            available: menus?.member,
          },
          {
            title: 'Settings',
            href: route('classroom.edit', classroom.id),
            icon: Settings2,
            available: menus?.classroomEdit,
          },
        ]}
      />
    </SidebarContent>
  );
};

export default ClassroomSidebar;
