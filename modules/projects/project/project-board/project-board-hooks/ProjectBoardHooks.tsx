import dayjs from 'dayjs';

import weekday from 'dayjs/plugin/weekday';
import localeFr from 'dayjs/locale/fr';
import { useAppDispatch, useAppSelector } from '@/modules/context/hooks';
import {
  decrementWeekOffset,
  incrementWeekOffset,
  resetWeekOffset,
  selectProjectBoard,
} from '@/modules/context/slices/projectBoard.slice';

dayjs.extend(weekday);
dayjs.locale(localeFr);

export function useProjectBoard() {
  const dispatch = useAppDispatch();
  const { currentWeekOffset } = useAppSelector(selectProjectBoard);
  const handlePreviousWeek = () => {
    dispatch(decrementWeekOffset());
  };
  const handleNextWeek = () => {
    dispatch(incrementWeekOffset());
  };
  const handleResetWeek = () => {
    dispatch(resetWeekOffset());
  };

  const weekdays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];

  const currentWeekStart = dayjs().add(currentWeekOffset, 'week').startOf('week').day(1);
  const currentWeekEnd = currentWeekStart.add(4, 'day');

  const isTwoMonths = currentWeekStart.month() !== currentWeekEnd.month();

  const formattedStartDate = currentWeekStart.format('MMM');
  const formattedEndDate = isTwoMonths
    ? currentWeekEnd.format('MMM YYYY')
    : currentWeekEnd.format('YYYY');

  return {
    currentWeekOffset,
    handlePreviousWeek,
    handleNextWeek,
    handleResetWeek,
    currentWeekStart,
    currentWeekEnd,
    isTwoMonths,
    formattedStartDate,
    formattedEndDate,
    weekdays,
  };
}
