export interface Blog {
  id: number;
  title_en: string;
  title_tr: string;
  slug_en: string;
  slug_tr: string;
  content_en: string;
  content_tr: string;
  excerpt_en?: string;
  excerpt_tr?: string;
  image_url?: string;
  images?: string[];
  author: string;
  read_time: number;
  tags?: string[];
  view_count: number;
  category_id: number;
  sub_category_id?: number;
  category?: any;
  sub_category?: any;
  domain: string;
  admin_domain: string;
  created_at: string;
}

export interface PaginatedBlogs {
  data: Blog[];
  total: number;
  current_page: number;
  per_page: number;
}
