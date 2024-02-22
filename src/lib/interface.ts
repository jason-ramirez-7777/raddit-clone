export interface QueryProps {
  params: {
    id: number;
  }
}

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

export interface PostType {
  id: number;
  title: string;
  content: string;
  votes: number;
  voteUsers: Array<Vote>;
  authorId: string;
  parentId?: string;
  children?: Array<CommentProps>;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentProps {
  id: number;
  content: string;
  votes: number;
  authorId: number;
  date: Date;
  children: Array<CommentProps>;
}