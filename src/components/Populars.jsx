import React from 'react';
import { PopularWeek } from './PopularWeek';
import { PopularMonth } from './PopularMonth';

export const Populars = ({popular_week, popular_month}) => {

  return (
    <>
      <PopularWeek popular_week={popular_week} />
      <PopularMonth popular_month={popular_month} />
    </>
  );
};
