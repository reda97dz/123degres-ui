import { Database, Json, supabase } from '@/modules/supabase';

export type TaskRow = Database['public']['Tables']['tasks']['Row'];
export type TaskHistoryRow = Database['public']['Tables']['task_histories']['Row'];
export type TaskInsert = Database['public']['Tables']['tasks']['Insert'];

export async function getProjectTasks(project_id: number, start_date: string, end_date: string) {
  const response = await supabase.rpc('get_filtered_task_histories', {
    p_id: project_id,
    start_date,
    end_date,
  });
  return response;
}

type GetProjectTasksResponse = Awaited<ReturnType<typeof getProjectTasks>>;
export type ProjectTasksSuccess = GetProjectTasksResponse['data'];
export type ModifiedProjectTasksSuccess = Array<TaskRow & { filtered_histories: string }>;
export type ProjectTasksError = GetProjectTasksResponse['error'];

export async function postProjectTask(task: TaskInsert) {
  const response = await supabase.from('tasks').insert(task);
  return response;
}

type PostProjectTaskResponse = Awaited<ReturnType<typeof postProjectTask>>;
export type PostProjectTaskSuccess = PostProjectTaskResponse['data'];
export type PostProjectTaskError = PostProjectTaskResponse['error'];

export async function getTask() {}

export async function getTaskHistory() {}
