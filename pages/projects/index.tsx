import { Layout } from '@/modules/layout';
import { Projects } from '@/modules/projects/Projects';
import {
  ProjectsResponseError,
  ProjectsResponseSuccess,
  getProjects,
} from '@/modules/supabase/projects';
import { Button } from '@mantine/core';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface ProjectsProps {
  projects: ProjectsResponseSuccess;
  error: ProjectsResponseError;
}

export default function projects(props: ProjectsProps) {
  const { projects, error } = props;

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(error ? error.message : null);

  const handleRefresh = async () => {
    setLoading(true);
    const response = await getProjects();
    setLoading(false);
    if (response.error) {
      setErrorMessage(`Error fetching again. ${response.error.message}`);
    } else {
      setErrorMessage('');
      router.replace(router.asPath);
    }
  };

  return (
    <Layout>
      {errorMessage ? (
        <>
          <p color="red">{errorMessage}</p>
          <Button
            type="button"
            disabled={loading}
            onClick={handleRefresh}
            variant="outline"
            loading={loading}
          >
            {loading ? 'chargement...' : 'Réessayer'}
          </Button>
        </>
      ) : (
        <>
          <Projects projects={projects} />
        </>
      )}
    </Layout>
  );
}

export async function getServerSideProps() {
  let { data, error } = await getProjects();

  return {
    props: {
      projects: data,
      error: error,
    },
  };
}
