import express from "express";
import cors from "cors";

import { ENV } from "./config/env";
import { clerkMiddleware } from "@clerk/express";

import userRoutes from "./routes/userRoutes";
import productsRoutes from "./routes/productsRoutes";
import commentRoutes from "./routes/commentRoutes";

const app = express();

if (!ENV.FRONTEND_URL) {
  throw new Error("FRONTEND_URL environment variable is required");
}

/* || MIDDLEWEARE SECTIONS */
app.use(cors({ origin: ENV.FRONTEND_URL, credentials: true })); //This allows other domains access resources from this endpoint without being blocked by CORS policy. We need this to allow our frontend to access the backend API. The credentials: true option allows cookies to be sent in cross-origin requests, which is necessary for authentication with Clerk. Make sure to replace ENV.FRONTEND_URL with the actual URL of your frontend application in production.
app.use(clerkMiddleware()); // auth object will be available in req.auth
app.use(express.json()); // This parses JSON reques bodies.
app.use(express.urlencoded({ extended: true })); // This parses form data like HTML fors.

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

app.use("/api/users", userRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/comments", commentRoutes);

app.listen(ENV.PORT, () => {
  console.log(`Server is up and running on Port: ${ENV.PORT}`);
});
