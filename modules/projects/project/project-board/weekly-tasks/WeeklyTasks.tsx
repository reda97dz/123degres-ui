import { Flex, Group } from '@mantine/core';
import dayjs from 'dayjs';
import { useProjectBoard } from '../project-board-hooks';
import { useAppSelector } from '@/modules/context/hooks';
import { selectProject } from '@/modules/context/slices/project.slice';
import { DailyTasks } from '../daily-tasks';

export function WeeklyTasks() {
  const { tasks } = useAppSelector(selectProject);

  const { weekdays, currentWeekStart } = useProjectBoard();

  return (
    <Group position="apart" mt="md" grow>
      {weekdays.map((dayName, index) => {
        const currentDate = currentWeekStart.add(index, 'day');
        const isCurrentDay = currentDate.isSame(dayjs(), 'day');
        const task = tasks ? [{ task: tasks[0] }] : [];
        return (
          <Flex key={Math.random()} direction="column" align="center" justify="flex-start">
            <DailyTasks
              day={dayName}
              currentDate={currentDate}
              isCurrentDay={isCurrentDay}
              tasks={task}
            />
          </Flex>
        );
      })}
    </Group>
  );
}
