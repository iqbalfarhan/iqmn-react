import { FC, PropsWithChildren } from 'react';
import SearchSvg from './svgs/search-svg';

type Props = PropsWithChildren;

const NoContent: FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-24 py-12">
      <SearchSvg className="aspect-auto w-lg opacity-20" />
      {children}
    </div>
  );
};

export default NoContent;
