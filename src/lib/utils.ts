import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Vote } from "./interface";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export function sliceContent(content: string) {
  return content.length > 72 ? `${content.slice(0, 72)}...` : content;
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

export function votePost(mutation: any, postId: number, userId: string, votes: number, voteUsers: Vote[], updateVoteNumber: any, updateVoteUsers: any) {
  
  const vote = voteUsers.find((votedUser: Vote) => votedUser?.userId === userId);
  
  if (vote) {
    if (vote.score === 1) {
      mutation.mutate(
        {
          id: postId,
          score: 0,
          userId: userId
        },
      );
      updateVoteNumber(votes - vote.score);
      updateVoteUsers(() => voteUsers.map((voteUsers: Vote) => {
        if (voteUsers.userId === userId) {
          voteUsers.score = 0;
        }
  
        return voteUsers;
      }));
    } else {
      mutation.mutate(
        {
          id: postId,
          score: 1,
          userId: userId
        },
      );
      updateVoteNumber(votes - vote.score + 1);
      updateVoteUsers(() => voteUsers.map((voteUsers: Vote) => {
        if (voteUsers.userId === userId) {
          voteUsers.score = 1;
        }
  
        return voteUsers;
      }));
    }
  } else {
    updateVoteNumber(votes + 1);
    updateVoteUsers([...voteUsers, {
      id: voteUsers.length + 1,
      postId,
      score: 1,
      userId
    }]);
  }
}

export function unvotePost(mutation: any, postId: number, userId: string, votes: number, voteUsers: Vote[], updateVoteNumber: any, updateVoteUsers: any) {
  mutation.mutate(
    {
      id: postId,
      score: -1,
      userId: userId
    },
  );

  const vote = voteUsers.find((votedUser: Vote) => votedUser?.userId === userId);

  if (vote) {
    if (vote.score === -1) {
      mutation.mutate(
        {
          id: postId,
          score: 0,
          userId: userId
        },
      );
      
      updateVoteNumber(votes - vote.score);
      updateVoteUsers(() => voteUsers.map((voteUsers: Vote) => {
        if (voteUsers.userId === userId) {
          voteUsers.score = 0;
        }
  
        return voteUsers;
      }));
    } else {
      mutation.mutate(
        {
          id: postId,
          score: -1,
          userId: userId
        },
      );

      updateVoteNumber(votes - vote.score - 1);
      updateVoteUsers(() => voteUsers.map((voteUsers: Vote) => {
        if (voteUsers.userId === userId) {
          voteUsers.score = -1;
        }
  
        return voteUsers;
      }));
    }

  } else {
    updateVoteNumber(votes - 1);
    updateVoteUsers([...voteUsers, {
      id: voteUsers.length + 1,
      postId,
      score: -1,
      userId
    }]);
  }
}

export function checkVoteStatus(userId: string, voteUsers: Vote[]) {
  const vote = voteUsers.find((votedUser: Vote) => votedUser?.userId === userId);

  if (vote) {
    return vote.score;
  } else {
    return 0;
  }
}