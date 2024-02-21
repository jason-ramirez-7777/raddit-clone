export interface QueryProps {
  params: {
    id: number;
  }
}

export interface IconProps {
  color?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

export interface PostProps {
  id: number;
  title: string;
  content: string;
  votes: number;
  authorId: number;
  date: Date;
  children: Array<CommentProps>;
}

export interface CommentProps {
  id: number;
  content: string;
  votes: number;
  authorId: number;
  date: Date;
  children: Array<CommentProps>;
}

export interface UserState {
  name: string;
  email: string;
}