import { useAppDispatch } from '@/modules/context/hooks';
import { setInitialProject } from '@/modules/context/slices/project.slice';
import { Layout } from '@/modules/layout';
import { Project } from "@/modules/projects/project"
import { ProjectTeam } from '@/modules/projects/project/project-team';
import {
  ProjectResponseError,
  ProjectResponseSuccess,
  getProject,
} from '@/modules/supabase/projects';
import {
  GetProjectTeamError,
  GetProjectTeamSuccess,
  getProjectTeam,
} from '@/modules/supabase/teams';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface ProjectProps {
  project: ProjectResponseSuccess;
  projectError: ProjectResponseError;
  projectTeam: GetProjectTeamSuccess;
  projectTeamError: GetProjectTeamError;
}

export default function project(props: ProjectProps) {
  const { project, projectError, projectTeam, projectTeamError } = props;
  const dispatch = useAppDispatch();
  const router = useRouter();

  const refresh = async () => {
    if (project) {
      const res = await getProjectTeam(project.id);
      if (!res.error) {
        router.replace(router.asPath);
      }
    }
  };

  useEffect(() => {
    dispatch(setInitialProject({ project: project, team: projectTeam }));
  }, [dispatch, project, projectTeam]);

  const renderMembers = () => {
    if (projectTeam && projectTeam.length > 0) {
      return projectTeam.map((teamMember) => {
        if (teamMember.users_tmp) {
          return <p key={Math.random()}>member: {teamMember.users_tmp.name}</p>;
        }
      });
    }
  };

  return (
    <Layout>
      <>
        <Project />
      </>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let projectResponse = await getProject(Number(context.query.projectId));
  let projectTeamResponse = await getProjectTeam(Number(context.query.projectId));

  return {
    props: {
      project: projectResponse.data,
      projectError: projectResponse.error,
      projectTeam: projectTeamResponse.data,
      projectTeamError: projectTeamResponse.error,
    },
  };
};
