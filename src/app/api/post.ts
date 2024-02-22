import { NextApiRequest, NextApiResponse } from "next";
import { api } from "@/trpc/server";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const posts = await api.post.getAll.query();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
