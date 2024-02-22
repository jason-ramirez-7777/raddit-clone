import { NextApiRequest, NextApiResponse } from "next";
import { api } from "@/trpc/server";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.method);

  if (req.method === "POST") {
    const { id, name, email, avatar } = req.body;

    try {
      await api.user.auth.mutate({
        id,
        name,
        email,
        avatar
      });

      res.status(200).json({ message: "User registered" });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
