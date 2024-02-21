import { PostProps, User } from "./interface";

export const users: User[] = [
  {
    id: 1,
    name: "Morgan Mastrangelo",
    email: "mmastrangelo1120@gmail.com",
    avatar: ""
  },
  {
    id: 2,
    name: "Anthony Bartolotte",
    email: "anthony.bartolotte.1010@gmail.com",
    avatar: ""
  },
  {
    id: 3,
    name: "Adrian Martin",
    email: "am.dev.8080@gmail.com",
    avatar: ""
  },
];

export const posts: PostProps[] = [
  {
    id: 1,
    title: "Honest opinions on Lime ebikes in London",
    content: "Tell me your good and bad experiences of using Lime as a Rider in London Tell me your good and bad experiences of using Lime as a Rider in LondonTell me your good and bad experiences of using Lime as a Rider in LondonTell me your good and bad experiences of using Lime as a Rider in LondonTell me your good and bad experiences of using Lime as a Rider in London",
    votes: 5,
    authorId: 1,
    children: []
  },
  {
    id: 2,
    title: "Honest opinions on Lime ebikes in London",
    content: "Tell me your good and bad experiences of using Lime as a Rider in London Tell me your good and bad experiences of using Lime as a Rider in LondonTell me your good and bad experiences of using Lime as a Rider in LondonTell me your good and bad experiences of using Lime as a Rider in LondonTell me your good and bad experiences of using Lime as a Rider in London",
    votes: -1,
    authorId: 3,
    children: [
      {
        id: 1,
        content: "Tell me your good and bad experiences of using Lime as a Rider in London Hah You are aaldskf ja ldsfaj ldslfaksjdflkajsd lasdlfkaj sldkfjlk",
        votes: -1,
        authorId: 3,
        children: [
          {
            id: 1,
            content: "I acknowledge. London Hah You are aaldskf ja ldsfaj ldslfaksjdflkajsd lasdlfkaj sldkfjlk",
            votes: 0,
            authorId: 1,
            children: []
          },
          {
            id: 2,
            content: "I disagree",
            votes: 2,
            authorId: 2,
            children: []
          },
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Honest opinions on Lime ebikes in London",
    content: "Tell me your good and bad experiences of using Lime as a Rider in London Tell me your good and bad experiences of using Lime as a Rider in LondonTell me your good and bad experiences of using Lime as a Rider in LondonTell me your good and bad experiences of using Lime as a Rider in LondonTell me your good and bad experiences of using Lime as a Rider in London",
    votes: 15,
    authorId: 2,
    children: []
  },
  {
    id: 4,
    title: "Honest opinions on Lime ebikes in London",
    content: "Tell me your good and bad experiences of using Lime as a Rider in London Tell me your good and bad experiences of using Lime as a Rider in LondonTell me your good and bad experiences of using Lime as a Rider in LondonTell me your good and bad experiences of using Lime as a Rider in LondonTell me your good and bad experiences of using Lime as a Rider in London",
    votes: 16,
    authorId: 3,
    children: []
  },
];