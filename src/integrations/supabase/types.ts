export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      career_roadmap: {
        Row: {
          course_id: string | null
          created_at: string | null
          description: string | null
          duration_estimate: string | null
          id: string
          is_completed: boolean | null
          step_number: number
          title: string
          user_id: string
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          description?: string | null
          duration_estimate?: string | null
          id?: string
          is_completed?: boolean | null
          step_number: number
          title: string
          user_id: string
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          description?: string | null
          duration_estimate?: string | null
          id?: string
          is_completed?: boolean | null
          step_number?: number
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "career_roadmap_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "career_roadmap_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          course_type: Database["public"]["Enums"]["course_type"]
          created_at: string | null
          description: string | null
          duration_months: number | null
          id: string
          image_url: string | null
          job_roles: string[] | null
          market_demand_score: number | null
          nsqf_level: Database["public"]["Enums"]["nsqf_level"]
          prerequisites: string[] | null
          sector: Database["public"]["Enums"]["sector_type"]
          title: string
        }
        Insert: {
          course_type: Database["public"]["Enums"]["course_type"]
          created_at?: string | null
          description?: string | null
          duration_months?: number | null
          id?: string
          image_url?: string | null
          job_roles?: string[] | null
          market_demand_score?: number | null
          nsqf_level: Database["public"]["Enums"]["nsqf_level"]
          prerequisites?: string[] | null
          sector: Database["public"]["Enums"]["sector_type"]
          title: string
        }
        Update: {
          course_type?: Database["public"]["Enums"]["course_type"]
          created_at?: string | null
          description?: string | null
          duration_months?: number | null
          id?: string
          image_url?: string | null
          job_roles?: string[] | null
          market_demand_score?: number | null
          nsqf_level?: Database["public"]["Enums"]["nsqf_level"]
          prerequisites?: string[] | null
          sector?: Database["public"]["Enums"]["sector_type"]
          title?: string
        }
        Relationships: []
      }
      learner_progress: {
        Row: {
          completed_at: string | null
          course_id: string
          created_at: string | null
          id: string
          progress_percentage: number | null
          started_at: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          course_id: string
          created_at?: string | null
          id?: string
          progress_percentage?: number | null
          started_at?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          course_id?: string
          created_at?: string | null
          id?: string
          progress_percentage?: number | null
          started_at?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "learner_progress_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "learner_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          age: number | null
          career_aspirations: string | null
          certifications: string[] | null
          created_at: string | null
          education_level: Database["public"]["Enums"]["education_level"] | null
          full_name: string
          id: string
          location: string | null
          preferred_language: string | null
          prior_skills: string[] | null
          socio_economic_background:
            | Database["public"]["Enums"]["socio_economic_status"]
            | null
          updated_at: string | null
        }
        Insert: {
          age?: number | null
          career_aspirations?: string | null
          certifications?: string[] | null
          created_at?: string | null
          education_level?:
            | Database["public"]["Enums"]["education_level"]
            | null
          full_name: string
          id: string
          location?: string | null
          preferred_language?: string | null
          prior_skills?: string[] | null
          socio_economic_background?:
            | Database["public"]["Enums"]["socio_economic_status"]
            | null
          updated_at?: string | null
        }
        Update: {
          age?: number | null
          career_aspirations?: string | null
          certifications?: string[] | null
          created_at?: string | null
          education_level?:
            | Database["public"]["Enums"]["education_level"]
            | null
          full_name?: string
          id?: string
          location?: string | null
          preferred_language?: string | null
          prior_skills?: string[] | null
          socio_economic_background?:
            | Database["public"]["Enums"]["socio_economic_status"]
            | null
          updated_at?: string | null
        }
        Relationships: []
      }
      recommendations: {
        Row: {
          course_id: string
          created_at: string | null
          id: string
          reason: string | null
          recommendation_score: number | null
          user_id: string
        }
        Insert: {
          course_id: string
          created_at?: string | null
          id?: string
          reason?: string | null
          recommendation_score?: number | null
          user_id: string
        }
        Update: {
          course_id?: string
          created_at?: string | null
          id?: string
          reason?: string | null
          recommendation_score?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recommendations_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recommendations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      course_type:
        | "certification"
        | "diploma"
        | "apprenticeship"
        | "skill_training"
        | "degree"
      education_level:
        | "below_10th"
        | "10th_pass"
        | "12th_pass"
        | "diploma"
        | "graduate"
        | "postgraduate"
      nsqf_level:
        | "level_1"
        | "level_2"
        | "level_3"
        | "level_4"
        | "level_5"
        | "level_6"
        | "level_7"
        | "level_8"
        | "level_9"
        | "level_10"
      sector_type:
        | "it"
        | "healthcare"
        | "manufacturing"
        | "agriculture"
        | "retail"
        | "hospitality"
        | "construction"
        | "education"
        | "finance"
        | "other"
      socio_economic_status: "low_income" | "middle_income" | "high_income"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      course_type: [
        "certification",
        "diploma",
        "apprenticeship",
        "skill_training",
        "degree",
      ],
      education_level: [
        "below_10th",
        "10th_pass",
        "12th_pass",
        "diploma",
        "graduate",
        "postgraduate",
      ],
      nsqf_level: [
        "level_1",
        "level_2",
        "level_3",
        "level_4",
        "level_5",
        "level_6",
        "level_7",
        "level_8",
        "level_9",
        "level_10",
      ],
      sector_type: [
        "it",
        "healthcare",
        "manufacturing",
        "agriculture",
        "retail",
        "hospitality",
        "construction",
        "education",
        "finance",
        "other",
      ],
      socio_economic_status: ["low_income", "middle_income", "high_income"],
    },
  },
} as const
