import { TaskHistoryRow, TaskRow } from '@/modules/supabase/tasks';
import { Card, Flex, Group, Text } from '@mantine/core';
import dayjs from 'dayjs';

interface DailyTasksProps {
  day: string;
  currentDate: dayjs.Dayjs;
  isCurrentDay: boolean;
  tasks: {
    task: TaskRow;
    history?: TaskHistoryRow;
  }[];
}

export function DailyTasks(props: DailyTasksProps) {
  const { day, currentDate, isCurrentDay, tasks } = props;
  return (
    <>
      <Card withBorder w="100%">
        <Flex align="center" direction="column">
          <Text size="sm" weight={isCurrentDay ? 'bold' : 'normal'}>
            {day.slice(0, 3).toUpperCase()}
          </Text>
          <Text size="sm" weight={isCurrentDay ? 'bold' : 'normal'}>
            {currentDate.format('DD')}
          </Text>
        </Flex>
      </Card>
      <Group mt="md" w="100%" p={0} spacing="xs">
        {tasks.map((t) => (
          <Card withBorder p="lg" w="100%" key={Math.random()}>
            {t.task.title}
          </Card>
        ))}
      </Group>
    </>
  );
}
