import { Button, Group, SimpleGrid } from '@mantine/core';
import { ProjectCard } from './project-card';
import { useAppSelector } from '../context/hooks';
import { selectProjects } from '../context/slices/projects.slice';
import { useRouter } from 'next/router';

export function Projects() {
  const { projects } = useAppSelector(selectProjects);
  const router = useRouter();

  const projectsList = projects?.map((project) => {
    return (
      <ProjectCard
        key={project.id}
        projectId={project.id}
        title={project.client}
        subtitle={project.address}
        completed={8}
        total={11}
        stats={[
          { value: '6', label: 'Tâches' },
          { value: '5', label: 'Achevées' },
        ]}
      />
    );
  });
  return (
    <>
      <Group position="right" mb="md">
        <Button onClick={() => router.push('/projects/new')}>Nouveau Projet</Button>
      </Group>
      <SimpleGrid
        cols={2}
        breakpoints={[
          { maxWidth: 'sm', cols: 2, spacing: 'sm' },
          { maxWidth: 'xs', cols: 1, spacing: 'sm' },
        ]}
      >
        {projectsList}
      </SimpleGrid>
    </>
  );
}
