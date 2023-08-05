import { Database, supabase } from '@/modules/supabase';

export type ProjectRow = Database['public']['Tables']['projects']['Row'];
export type ProjectInsert = Database['public']['Tables']['projects']['Insert'];

export async function getProject(projectId: number) {
  const response = await supabase.from('projects').select().eq('id', projectId).limit(1).single();
  return response;
}

export async function getProjects() {
  const response = await supabase.from('projects').select();
  return response;
}

export async function postProject(project: ProjectInsert) {
  const response = await supabase.from('projects').insert(project).select();
  return response;
}

type GetProjectResponse = Awaited<ReturnType<typeof getProject>>;
export type ProjectResponseSuccess = GetProjectResponse['data'];
export type ProjectResponseError = GetProjectResponse['error'];

type GetProjectsResponse = Awaited<ReturnType<typeof getProjects>>;
export type ProjectsResponseSuccess = GetProjectsResponse['data'];
export type ProjectsResponseError = GetProjectsResponse['error'];

type PostProjectResponse = Awaited<ReturnType<typeof postProject>>;
export type PostProjectResponseSuccess = PostProjectResponse['data'];
export type PostProjectResponseError = PostProjectResponse['error'];
