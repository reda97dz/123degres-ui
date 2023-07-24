import { Layout } from "@/modules/layout/Layout"
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
