import { Database, supabase } from "@/modules/supabase";

export type TaskRow = Database['public']['Tables']['tasks']['Row']
export type TaskInsert = Database['public']['Tables']['tasks']['Insert']


export async function getProjectTasks(project_id: number) {
  const response = await supabase.from('tasks').select(`*, task_histories (*)`).filter("id", "is", project_id)
  return response
}

type GetProjectTasksResponse = Awaited<ReturnType<typeof getProjectTasks>>;
export type ProjectTasksSuccess = GetProjectTasksResponse['data'];
export type ProjectTasksError = GetProjectTasksResponse['error'];

export async function postProjectTask(task: TaskInsert) {
  const response = await supabase.from("tasks").insert(task)
  return response
}

type PostProjectTaskResponse = Awaited<ReturnType<typeof postProjectTask>>;
export type PostProjectTaskSuccess = PostProjectTaskResponse['data'];
export type PostProjectTaskError = PostProjectTaskResponse['error'];

export async function getTask() {}

export async function getTaskHistory() {}