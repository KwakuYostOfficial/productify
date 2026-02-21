import express from "express";
import cors from "cors";

import { ENV } from "./config/env";
import { clerkMiddleware } from "@clerk/express";

import userRoutes from "./routes/userRoutes";
import productsRoutes from "./routes/productsRoutes";
import commentRoutes from "./routes/commentRoutes";

const app = express();

const corsOption = {
  origin: ENV.FRONTEND_URL,
  credentials: true, // credentials: true allows the frontend to send cookies to the backend so that we can authenticate the users
};

/* || MIDDLEWEARE SECTIONS */
app.use(clerkMiddleware()); // auth object will be available in req.auth
app.use(express.json()); // This parses JSON reques bodies.
app.use(express.urlencoded({ extended: true })); // This parses form data like HTML fors.
app.use(cors(corsOption)); //This allows other domains access resources from this endpoint without being blocked

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
