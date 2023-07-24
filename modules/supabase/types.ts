export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          access: string | null
          address: string
          client: string
          complementary: string | null
          created_at: string | null
          created_by: string | null
          end: string
          estimation: number | null
          goal_per_day: number | null
          id: number
          phone: string
          start: string
          team_id: number | null
          updated_at: string | null
        }
        Insert: {
          access?: string | null
          address: string
          client: string
          complementary?: string | null
          created_at?: string | null
          created_by?: string | null
          end: string
          estimation?: number | null
          goal_per_day?: number | null
          id?: number
          phone: string
          start: string
          team_id?: number | null
          updated_at?: string | null
        }
        Update: {
          access?: string | null
          address?: string
          client?: string
          complementary?: string | null
          created_at?: string | null
          created_by?: string | null
          end?: string
          estimation?: number | null
          goal_per_day?: number | null
          id?: number
          phone?: string
          start?: string
          team_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_team_id_fkey"
            columns: ["team_id"]
            referencedRelation: "teams"
            referencedColumns: ["id"]
          }
        ]
      }
      task_histories: {
        Row: {
          created_at: string | null
          date: string
          hidden: boolean | null
          id: number
          status: string | null
          task_id: number
          total_achieved: number | null
        }
        Insert: {
          created_at?: string | null
          date: string
          hidden?: boolean | null
          id?: number
          status?: string | null
          task_id: number
          total_achieved?: number | null
        }
        Update: {
          created_at?: string | null
          date?: string
          hidden?: boolean | null
          id?: number
          status?: string | null
          task_id?: number
          total_achieved?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "task_histories_task_id_fkey"
            columns: ["task_id"]
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          }
        ]
      }
      tasks: {
        Row: {
          created_at: string | null
          id: number
          project_id: number
          title: string
          total: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          project_id: number
          title: string
          total?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          project_id?: number
          title?: string
          total?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_project_id_fkey"
            columns: ["project_id"]
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
      team_member: {
        Row: {
          created_at: string | null
          id: number
          team_id: number
          user_id: string | null
          user_id_tmp: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          team_id: number
          user_id?: string | null
          user_id_tmp?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          team_id?: number
          user_id?: string | null
          user_id_tmp?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "team_member_team_id_fkey"
            columns: ["team_id"]
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_member_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_member_user_id_tmp_fkey"
            columns: ["user_id_tmp"]
            referencedRelation: "users_tmp"
            referencedColumns: ["id"]
          }
        ]
      }
      teams: {
        Row: {
          created_at: string | null
          id: number
          name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: number
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: number
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: number
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          created_at: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users_tmp: {
        Row: {
          created_at: string | null
          id: number
          name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      app_role: "admin" | "moderator" | "employee"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
