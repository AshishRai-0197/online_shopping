import knex from "knex";
import knexConfig from "@/knexfile";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendMail } from "../email/route";

const kn = knex(knexConfig.development);

export async function POST(req: Request) {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    console.error("JWT_SECRET is not set. Add it to your .env file.");
    return Response.json({ error: "Server is not configured" }, { status: 500 });
  }

  try {
    const { email, password } = await req.json();

    if (!email || !password)
      return Response.json(
        { error: "Email & password required" },
        { status: 400 }
      );

    const existingUser = await kn("users").where({ email }).first();
    if (existingUser)
      return Response.json({ error: "User already exists" }, { status: 409 });

    const hashedPassword = await bcrypt.hash(password, 10);
    const [userId] = await kn("users").insert({
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: userId, email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    sendMail(email, "signup").catch((error) => {
      console.error("Failed to send welcome email:", error);
    });

    return Response.json({
      message: "Signup successful",
      token,
      user: { id: userId, email },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
