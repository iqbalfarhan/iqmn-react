import AppLayout from '@/layouts/app-layout';
import { Role } from '@/types';
import { FC } from 'react';

type Props = {
  role: Role;
};

const RoleDetail: FC<Props> = ({ role }) => {
  return <AppLayout title={role.name}>{JSON.stringify(role)}</AppLayout>;
};

export default RoleDetail;
