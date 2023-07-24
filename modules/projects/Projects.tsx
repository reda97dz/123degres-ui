import { SimpleGrid, Space } from '@mantine/core';
import { ProjectsResponseSuccess } from '../supabase/projects';
import { ProjectCard } from './project-card';
import { AddProjectForm } from './add-project-form';

interface ProjectsProps {
  projects: ProjectsResponseSuccess;
}
export function Projects(props: ProjectsProps) {
  const { projects } = props;
  const projectsList = projects?.map((project) => {
    return (
      <ProjectCard
        key={project.id}
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
      <AddProjectForm />
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