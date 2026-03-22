export interface Blog {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  images?: string[];
  author: string;
  createdAt: string;
  readTime: number;
  tags: string[];
  category: string;
  subCategory: string;
  category_id: number;
  sub_category_id?: number;
  viewCount: number;
}
