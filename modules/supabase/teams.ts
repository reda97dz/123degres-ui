import { Database, supabase } from '@/modules/supabase';

export type TeamInsert = Database['public']['Tables']['teams']['Insert'];
export type TeamRow = Database['public']['Tables']['teams']['Row'];
export type TeamUpdate = Database['public']['Tables']['teams']['Update'];
export type TeamMemberInsert = Database['public']['Tables']['team_member']['Insert'];

export async function postTeam(team: TeamInsert) {
  const response = await supabase.from('teams').insert(team).select();
  return response;
}

type PostTeamResponse = Awaited<ReturnType<typeof postTeam>>;
export type PostTeamResponseSuccess = PostTeamResponse['data'];
export type PostTeamResponseError = PostTeamResponse['error'];

export async function postTeamMember(teamMember: TeamMemberInsert) {
  const response = await supabase.from('team_member').insert(teamMember);
  return response;
}

type PostTeamMemberResponse = Awaited<ReturnType<typeof postTeamMember>>;
export type PostTeamMemberResponseSuccess = PostTeamMemberResponse['data'];
export type PostTeamMemberResponseError = PostTeamMemberResponse['error'];

export async function updateTeam(team: TeamUpdate, id: number) {
  const response = await supabase.from('teams').update(team).eq('id', id);
  return response;
}

type UpdateTeamResponse = Awaited<ReturnType<typeof updateTeam>>;
export type UpdateTeamResponseSuccess = UpdateTeamResponse['data'];
export type UpdateTeamResponseError = UpdateTeamResponse['error'];

export async function getProjectTeam(projectId: number) {
  const response = await supabase
    .from('projects')
    .select('teams (*, team_member (users_tmp (name, email)))')
    .eq('id', projectId)
    .limit(1)
    .single();
  return response;
}

type GetProjectTeam = Awaited<ReturnType<typeof getProjectTeam>>;
export type GetProjectTeamSuccess = GetProjectTeam['data'];
export type GetProjectTeamError = GetProjectTeam['error'];
