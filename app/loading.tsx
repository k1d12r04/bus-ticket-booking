'use client';

import { InfinitySpin } from 'react-loader-spinner';

const Loading = () => {
  return (
    <div className="grid place-items-center h-screen">
      <InfinitySpin width="200" color="#E4335A" />
    </div>
  );
};
export default Loading;
