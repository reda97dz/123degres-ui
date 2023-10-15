import { useAppDispatch } from '@/modules/context/hooks';
import { setInitialProject } from '@/modules/context/slices/project.slice';
import { Layout } from '@/modules/layout';
import { Project } from '@/modules/projects/project';
import {
  ProjectResponseError,
  ProjectResponseSuccess,
  getProject,
} from '@/modules/supabase/projects';
import {
  ModifiedProjectTasksSuccess,
  ProjectTasksError,
  ProjectTasksSuccess,
  getProjectTasks,
} from '@/modules/supabase/tasks';
import {
  GetProjectTeamError,
  GetProjectTeamSuccess,
  getProjectTeam,
} from '@/modules/supabase/teams';
import { getEndOfWeek, getStartOfWeek } from '@mantine/dates';
import { GetServerSideProps } from 'next';
import { useEffect } from 'react';

interface ProjectProps {
  project: ProjectResponseSuccess;
  projectError: ProjectResponseError;
  projectTeam: GetProjectTeamSuccess;
  projectTeamError: GetProjectTeamError;
  projectTasks: ModifiedProjectTasksSuccess;
  projectTasksError: ProjectTasksError;
}

export default function project(props: ProjectProps) {
  const { project, projectTeam, projectTasks } = props;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setInitialProject({ project: project, team: projectTeam, tasks: projectTasks }));
  }, [dispatch, project, projectTeam]);

  return (
    <Layout>
      <Project />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const today = new Date();
  const startDate = getStartOfWeek(today);
  const endDate = getEndOfWeek(today);
  const projectId = Number(context.query.projectId);
  let projectResponse = await getProject(projectId);
  let projectTeamResponse = await getProjectTeam(projectId);
  let projectTasks = await getProjectTasks(
    projectId,
    startDate.toISOString(),
    endDate.toISOString()
  );

  return {
    props: {
      project: projectResponse.data,
      projectError: projectResponse.error,
      projectTeam: projectTeamResponse.data,
      projectTeamError: projectTeamResponse.error,
      projectTasks: projectTasks.data,
      projectTasksEror: projectTasks.error,
    },
  };
};
