import { Database, supabase } from '@/modules/supabase';

export type TeamInsert = Database['public']['Tables']['teams']['Insert'];
export type TeamRow = Database['public']['Tables']['teams']['Row'];

export type TeamMemberInsert = Database['public']['Tables']['team_member']['Insert'];

export async function postTeam(team: TeamInsert) {
  const response = await supabase.from('teams').insert(team);
  return response;
}

export async function postTeamMember(teamMember: TeamMemberInsert) {
  const response = await supabase.from('team_member').insert(teamMember);
  return response;
}

type PostTeamResponse = Awaited<ReturnType<typeof postTeam>>;
export type PostTeamResponseSuccess = PostTeamResponse['data'];
export type PostTeamResponseError = PostTeamResponse['error'];

type PostTeamMemberResponse = Awaited<ReturnType<typeof postTeamMember>>;
export type PostTeamMemberResponseSuccess = PostTeamMemberResponse['data'];
export type PostTeamMemberResponseError = PostTeamMemberResponse['error'];