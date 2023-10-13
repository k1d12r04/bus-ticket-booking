'use client';

import { InfinitySpin } from 'react-loader-spinner';

type SpinnerProps = {
  width: string;
};

const Spinner = ({ width }: SpinnerProps) => {
  return <InfinitySpin width={width} color="#E4335A" />;
};
export default Spinner;
