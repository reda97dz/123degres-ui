import { Database, supabase } from '@/modules/supabase';

export type UserTmpRow = Database['public']['Tables']['users_tmp']['Row'];
export type UserTmpInsert = Database['public']['Tables']['users_tmp']['Insert'];

export async function getUsersTmp() {
  const response = await supabase.from('users_tmp').select();
  return response;
}

export async function postUserTmp(userTmp: UserTmpInsert) {
  const response = await supabase.from('users_tmp').insert(userTmp).select();
  return response;
}

type GetUsersTmpResponse = Awaited<ReturnType<typeof getUsersTmp>>;
export type UsersTmpResponseSuccess = GetUsersTmpResponse['data'];
export type UsersTmpResponseError = GetUsersTmpResponse['error'];

type PostUsersTmpResponse = Awaited<ReturnType<typeof postUserTmp>>;
export type PostUserTmpResponseSuccess = PostUsersTmpResponse['data'];
export type PostUserTmpResponseError = PostUsersTmpResponse['error'];
