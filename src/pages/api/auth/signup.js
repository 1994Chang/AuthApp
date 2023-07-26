import connectMongo from "../../../../database/conn";
import Users from "../../../../model/Schema";
import { hash } from "bcryptjs";

export default async function handler(req, res) {
  connectMongo().catch(error => res.json({ error: "connection failed...." }));
  console.log(req, "request log");

  if (req.method === "POST") {
    try {
      if (!req.body) return res.status(404).json({ error: "Don't have form Data...." });
      const { username, email, password } = req.body;

       // Check for missing fields or invalid data
       if (!username || !email || !password) {
        return res.status(400).json({ error: "Missing fields in the request." });
      }
      
      // Check password valid or invalid 
      if (!password || typeof password !== "string") {
        return res.status(400).json({ error: "Invalid password provided." });
      }

      const checkexisting = await Users.findOne({ email });
      if (checkexisting) return res.status(422).json({ message: "User Already Exists...." });

      const hashedPassword = await hash(password, 12);

      const newUser = await Users.create({ username, email, password: hashedPassword });
      return res.status(201).json({ status: true, user: newUser });
    } catch (e) {
      console.log(e, "error fetch");
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(500).json({ message: "HTTP method is not valid" });
  }
}
