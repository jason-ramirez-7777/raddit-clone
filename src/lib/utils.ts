import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Vote } from "./interface";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs)); // Merging class names
}

// Async function to register a user
export async function registerUser(requestData: any) {
  const response = await fetch("/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestData)
  });

  return response.json();
}

// Function to slice content if it exceeds a certain length
export function sliceContent(content: string) {
  return content.length > 72 ? `${content.slice(0, 72)}...` : content; // Slicing content if it exceeds 72 characters
}

// Function to calculate the age of a post
export function calculateAgeOfPost(postDate: Date) {
  const oneMinute: number = 60 * 1000;
  const oneHour: number = 60 * oneMinute;
  const oneDay: number = 24 * oneHour;

  const currentDate: Date = new Date();
  const differenceInTime: number = currentDate.getTime() - postDate.getTime();

  if (differenceInTime < oneHour) { // If less than an hour
    const differenceInMinutes: number = Math.round(differenceInTime / oneMinute);
    return `${differenceInMinutes} mins ago`;
  } else if (differenceInTime < oneDay) { // If less than a day
    const differenceInHours: number = Math.round(differenceInTime / oneHour);
    return `${differenceInHours} hours ago`;
  } else {
    const differenceInDays: number = Math.round(differenceInTime / oneDay);
    if (differenceInDays === 0) {
      return "today";
    } else {
      return `${differenceInDays} days ago`;
    }
  }
}

// Function to handle voting on a post
export function votePost(mutation: any, postId: number, userId: string, votes: number, voteUsers: Vote[], updateVoteNumber: any, updateVoteUsers: any) {
  const vote = voteUsers.find((votedUser: Vote) => votedUser?.userId === userId); // Finding the user's vote

  if (vote) { // If the user has already voted on the post
    if (vote.score === 1) { // If the user's vote is positive
      mutation.mutate({ id: postId, score: 0, userId: userId }); // Remove the user's vote
      updateVoteNumber(votes - vote.score); // Update the vote count
      updateVoteUsers(() => voteUsers.map((voteUsers: Vote) => { // Update the list of vote users
        if (voteUsers.userId === userId) {
          voteUsers.score = 0;
        }
        return voteUsers;
      }));
    } else { // If the user's vote is not positive
      mutation.mutate({ id: postId, score: 1, userId: userId }); // Change the user's vote to positive
      updateVoteNumber(votes - vote.score + 1); // Update the vote count
      updateVoteUsers(() => voteUsers.map((voteUsers: Vote) => { // Update the list of vote users
        if (voteUsers.userId === userId) {
          voteUsers.score = 1;
        }
        return voteUsers;
      }));
    }
  } else { // If the user has not voted on the post
    updateVoteNumber(votes + 1); // Increment the vote count
    updateVoteUsers([...voteUsers, { id: voteUsers.length + 1, postId, score: 1, userId }]); // Add the user's vote to the list
  }
}

// Function to handle revoking a vote on a post
export function devotePost(mutation: any, postId: number, userId: string, votes: number, voteUsers: Vote[], updateVoteNumber: any, updateVoteUsers: any) {
  mutation.mutate({ id: postId, score: -1, userId: userId }); // Set the user's vote to negative

  const vote = voteUsers.find((votedUser: Vote) => votedUser?.userId === userId); // Finding the user's vote

  if (vote) { // If the user has already voted on the post
    if (vote.score === -1) { // If the user's vote is negative
      mutation.mutate({ id: postId, score: 0, userId: userId }); // Remove the user's vote
      updateVoteNumber(votes - vote.score); // Update the vote count
      updateVoteUsers(() => voteUsers.map((voteUsers: Vote) => { // Update the list of vote users
        if (voteUsers.userId === userId) {
          voteUsers.score = 0;
        }
        return voteUsers;
      }));
    } else { // If the user's vote is not negative
      mutation.mutate({ id: postId, score: -1, userId: userId }); // Change the user's vote to negative
      updateVoteNumber(votes - vote.score - 1); // Update the vote count
      updateVoteUsers(() => voteUsers.map((voteUsers: Vote) => { // Update the list of vote users
        if (voteUsers.userId === userId) {
          voteUsers.score = -1;
        }
        return voteUsers;
      }));
    }

  } else { // If the user has not voted on the post
    updateVoteNumber(votes - 1); // Decrement the vote count
    updateVoteUsers([...voteUsers, { id: voteUsers.length + 1, postId, score: -1, userId }]); // Add the user's vote to the list
  }
}

// Function to check the vote status of a user on a post
export function checkVoteStatus(userId: string, voteUsers: Vote[]) {
  const vote = voteUsers.find((votedUser: Vote) => votedUser?.userId === userId); // Finding the user's vote

  if (vote) { // If the user has voted on the post
    return vote.score;
  } else {
    return 0;
  }
}
