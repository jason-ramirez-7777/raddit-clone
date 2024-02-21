export interface IconProps {
  color?: string;
}

export interface PostProps {
  id: number;
  title: string;
  content: string;
  vote: number;
  poster: {
    name: string;
    avatar: string;
  }
  date: Date;
}