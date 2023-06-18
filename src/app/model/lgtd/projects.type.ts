export type typeproject= {
  id: number;
  user_id:string;
  title: string;
  is_public: boolean;
  is_archive: boolean;
  description: string;
  action_plan: string;
  state: string;
  from_date: string;
  to_date: string;
  review:string;
  important:number;
  created_at:string
  updated_at:string
};

export type typetask= {
  id: number;
  user_id:string;
  project_id: number;
  is_public: boolean;
  is_archive: boolean;
  title: string;
  action_plan: string;
  detail: string;
  start_date: string;
  due_date: string;
  state: string;
  type: string;
  review:string;
};