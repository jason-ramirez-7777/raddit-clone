export interface IconProps {
  color?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Vote {
  id: number;
  postId: number;
  score: number;
  userId: string;
}

export interface PostProps {
  id: number;
  title: string;
  content: string;
  votes: number;
  voteUsers: Array<Vote>;
  authorId: string;
  parentId?: string;
  children?: Array<PostProps>;
  createdAt: Date;
  updatedAt: Date;
}