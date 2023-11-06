import { ListDashboardDto } from '../../dashboard/dto/list-dashboard.dto';
import {
  differenceInHours,
  differenceInMinutes,
  differenceInDays,
} from 'date-fns';
export async function TempoInventario(data: ListDashboardDto[]) {
  let result = '';

  const newData = data
    .filter((value) => value.firstStatus)
    .sort((a, b) => a.updated_at.getTime() - b.updated_at.getTime());

  if (newData.length === 0) {
    result = '00:00:00';
  } else {
    const startTime = newData[0].updated_at;
    const endTime = newData[newData.length - 1].updated_at;

    const diffMinutes = differenceInMinutes(endTime, startTime);
    const diffHours = differenceInHours(endTime, startTime);
    const diffDays = differenceInDays(endTime, startTime);

    if (startTime.getTime() === endTime.getTime()) {
      result = '00:00:01';
    } else {
      result = `${String(diffDays).padStart(2, '0')}:${String(
        diffHours % 24,
      ).padStart(2, '0')}:${String(diffMinutes % 60).padStart(2, '0')}`;
    }
  }

  return result;
}
