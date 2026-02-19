import express from "express";
import { ENV } from "./config/env";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";

const app = express();

/* || MIDDLEWEARE SECTIONS */
app.use(clerkMiddleware()); // auth object will be available in req.auth
app.use(express.json()); // This parses JSON reques bodies.
app.use(express.urlencoded({ extended: true })); // This parses form data like HTML fors.
app.use(cors({ origin: ENV.FRONTEND_URL })); //This allows other domains access resources from this endpoint without being blocked

app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to Productify API - Powered by PostgreSQL Drizzle ORM & Clerk Auth",
    endpoint: {
      users: "/api/users",
      products: "/api/products",
      comments: "/api/comments",
    },
  });
});

app.listen(ENV.PORT, () => {
  console.log(`Server is up and running on Port: ${ENV.PORT}`);
});
