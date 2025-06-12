import React from 'react';
import { Popular } from './Popular';

export const Populars = ({popular_week, popular_month}) => {

  return (
    <>
      <Popular time="တစ်ပတ်" popular={popular_week} />
      <Popular time="တစ်လ" popular={popular_month} />
    </>
  );
};
