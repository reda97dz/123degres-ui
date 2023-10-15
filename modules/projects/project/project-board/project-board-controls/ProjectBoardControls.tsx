import { ActionIcon, Button, Group, Text, useMantineTheme } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { useProjectBoard } from '../project-board-hooks';

export function ProjectBoardControls() {
  const theme = useMantineTheme();
  const {
    handlePreviousWeek,
    handleResetWeek,
    formattedStartDate,
    isTwoMonths,
    formattedEndDate,
    handleNextWeek,
  } = useProjectBoard();

  return (
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
  );
}
