import { Layout } from '@/modules/layout';
import {
  ProjectResponseError,
  ProjectResponseSuccess,
  getProject,
} from '@/modules/supabase/projects';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

interface ProjectProps {
  project: ProjectResponseSuccess;
  error: ProjectResponseError;
}

export default function project(props: ProjectProps) {
  const { project, error } = props;

  return (
    <Layout>
      <>
        Project {project?.id} {project?.client}
      </>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let { data, error } = await getProject(Number(context.query.projectId));

  return {
    props: {
      project: data,
      error: error,
    },
  };
};
