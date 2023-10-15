import { Card } from '@mantine/core';
import { useAppSelector } from '@/modules/context/hooks';
import { selectProject } from '@/modules/context/slices/project.slice';
import { ProjectBoardControls } from './project-board-controls';
import { WeeklyTasks } from './weekly-tasks';

export function ProjectBoard() {
  const { tasks } = useAppSelector(selectProject);

  return (
    <Card mt="md" withBorder>
      <ProjectBoardControls />
      {tasks?.length === 0 ? 'Loading' : <WeeklyTasks />}
      {/* {tasks?.length === 0 && <>No tasks, create new tasks</>} */}
    </Card>
  );
}
