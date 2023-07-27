import { Layout } from '@/modules/layout';
import { AddProjectForm } from '@/modules/projects/add-project-form';

export default function newProject() {
  return (
    <Layout>
      <AddProjectForm />
    </Layout>
  );
}
