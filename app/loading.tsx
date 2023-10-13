'use client';

import Spinner from '@/components/shared/Spinner';

const Loading = () => {
  return (
    <div className="grid place-items-center h-screen">
      <Spinner width="200" />
    </div>
  );
};
export default Loading;
