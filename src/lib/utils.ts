import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sliceContent(content: string) {
  return content.slice(0, 72);
}

export function calculateAgeOfPost(postDate: Date) {
  const oneDay: number = 24 * 60 * 60 * 1000;
  const currentDate: Date = new Date();
  const differenceInTime: number = currentDate.getTime() - postDate.getTime();
  const differenceInDays: number = Math.round(differenceInTime / oneDay);

  if (differenceInDays === 0) {
    return "today";
  } else {
    return `${differenceInDays} days ago`;
  }
}