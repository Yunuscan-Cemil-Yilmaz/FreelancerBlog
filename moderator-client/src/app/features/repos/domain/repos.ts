export interface Repo {
  id: number;
  title: string;
  slug: string;
  description_en: string;
  description_tr: string;
  image_url?: string;
  images?: string[];
  project_url?: string;
  repo_url?: string;
  is_public: boolean;
  tech_stack?: string[];
  view_count: number;
  domain: string;
  admin_domain: string;
  created_at: string;
}

export interface PaginatedRepos {
  data: Repo[];
  total: number;
  current_page: number;
  per_page: number;
}
