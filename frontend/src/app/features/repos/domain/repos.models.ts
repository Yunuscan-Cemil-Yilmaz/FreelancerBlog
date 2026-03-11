export interface Repo {
  id: number;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  images?: string[];
  projectUrl: string;
  repoUrl?: string;
  isPublic: boolean;
  techStack: string[];
  viewCount: number;
  createdAt: string;
}
