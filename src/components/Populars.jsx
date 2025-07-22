import { Popular } from './Popular';

export const Populars = ({popular_week, popular_month}) => {

  return (
    <div className="flex flex-col">
      <Popular isWeek popular={popular_week} />
      <Popular isWeek={false} popular={popular_month} />
    </div>
  );
};
