import {
  ActionIcon,
  Button,
  Card,
  Container,
  Flex,
  Group,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import { useState } from 'react';
import localeFr from 'dayjs/locale/fr';

dayjs.extend(weekday);
dayjs.locale(localeFr);

const weekdays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];

export function ProjectBoard() {
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);
  const handlePreviousWeek = () => {
    setCurrentWeekOffset(currentWeekOffset - 1);
  };

  const theme = useMantineTheme();

  const handleNextWeek = () => {
    setCurrentWeekOffset(currentWeekOffset + 1);
  };

  const handleResetWeek = () => {
    setCurrentWeekOffset(0);
  };

  const currentWeekStart = dayjs().add(currentWeekOffset, 'week').startOf('week').day(1);
  const currentWeekEnd = currentWeekStart.add(4, 'day');

  const isTwoMonths = currentWeekStart.month() !== currentWeekEnd.month();

  const formattedStartDate = currentWeekStart.format('MMM');
  const formattedEndDate = isTwoMonths
    ? currentWeekEnd.format('MMM YYYY')
    : currentWeekEnd.format('YYYY');

  return (
    <Card mt="md" withBorder>
      <Group position="apart">
        <Button variant="default" color="gray" onClick={handleResetWeek}>
          Aujourd'hui
        </Button>
        <Text align="center" weight="bold">
          {formattedStartDate} {isTwoMonths ? ` - ${formattedEndDate}` : formattedEndDate}
        </Text>
        <Group position="right">
          <ActionIcon onClick={handlePreviousWeek}>
            <IconChevronLeft color={theme.colorScheme === 'light' ? 'black' : 'white'} />
          </ActionIcon>
          <ActionIcon onClick={handleNextWeek}>
            <IconChevronRight color={theme.colorScheme === 'light' ? 'black' : 'white'} />
          </ActionIcon>
        </Group>
      </Group>
      <Group position="apart" mt="md" grow>
        {weekdays.map((dayName, index) => {
          const currentDate = currentWeekStart.add(index, 'day');
          const isCurrentDay = currentDate.isSame(dayjs(), 'day');
          return (
            // <Card key={dayName} padding="md" shadow="xs">
            <Flex align="center" direction="column">
              <Text size="sm" weight={isCurrentDay ? 'bold' : 'normal'}>
                {dayName.slice(0, 3).toUpperCase()}
              </Text>
              <Text size="sm" weight={isCurrentDay ? 'bold' : 'normal'}>
                {currentDate.format('DD')}
              </Text>
            </Flex>
            // </Card>
          );
        })}
      </Group>
    </Card>
  );
}
