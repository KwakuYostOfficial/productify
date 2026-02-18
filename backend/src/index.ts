import express from "express";
import { ENV } from "./config/env";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to Productify API - Powered by PostgreSQL Drizzle ORM and Clerk Auth",
    endpoints: {
      users: "/api/users",
      products: "/api/products",
      comments: "/api/comments",
    },
  });
});

app.listen(ENV.PORT, () =>
  console.log(`Port is live and running on ${ENV.PORT}`),
);
