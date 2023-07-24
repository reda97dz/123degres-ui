import { Database, supabase } from '@/modules/supabase';

export type ProjectRow = Database['public']['Tables']['projects']['Row'];
export type ProjectInsert = Database['public']['Tables']['projects']['Insert'];

export async function getProjects() {
  const response = await supabase.from('projects').select();
  return response;
}

export async function postProject(project: ProjectInsert) {
  const response = await supabase.from('projects').insert(project);
  return response;
}

type GetProjectsResponse = Awaited<ReturnType<typeof getProjects>>;
export type ProjectsResponseSuccess = GetProjectsResponse['data'];
export type ProjectsResponseError = GetProjectsResponse['error'];

type PostProjectResponse = Awaited<ReturnType<typeof postProject>>;
export type PostProjectResponseSuccess = PostProjectResponse['data'];
export type PostProjectResponseError = PostProjectResponse['error'];
