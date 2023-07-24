import { Layout } from '@/modules/layout';
import { Router, useRouter } from 'next/router';

export default function project() {
  const router = useRouter();

  const { projectId } = router.query;

  return (
    <Layout>
      <>Project {projectId}</>
    </Layout>
  );
}
