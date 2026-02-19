import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import { ENV } from "../config/env";
import { Client } from "@clerk/express";

if (!ENV.DATABASE_URL) {
  throw new Error("The DATABASE_URL is not set in the environment vairables");
}

//This creates a new pool manager
const pool = new Pool({ connectionString: ENV.DATABASE_URL });

// THis are event listeners this listens to errors and connections and display a log in the console
pool.on("connect", () => {
  console.log("Database have been connnected successfully ✅");
});

pool.on("error", (err) => {
  console.log("💥There was an error error message:", err);
});

/* || This starts a connection with the database */
export const db = drizzle({ client: pool, schema });

//What is a Connection Pool?
//A connection pool is a cache of database connections that are kept open and reused.

//Why use it?
//Opening / clising connnections is slow, Instead of creating a new connection for each request, we reuse existing ones.
//Database limit concurrent connections. A pool manages a fixed number of connections and shares them across requests.
