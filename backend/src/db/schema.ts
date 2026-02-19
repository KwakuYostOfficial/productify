import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

/* || USER TABLE SCHEMA */
//Key is wat you would have in the code and the text parameter is the column name in the database
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

/* || PRODUCT TABLE SCHEMA */
export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

/* || COMMENTS TABLE SCHEMA */
export const comments = pgTable("comments", {
  id: uuid("id").defaultRandom().primaryKey(),
  content: text("content").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

// Relations define how tables connect to each other, This enables drizzle's query API
// to automatically join related data when using with: {relationName: true}

//User Relations: A user can have many products and many Comments
//many() means one user can have multiple related records

export const userRelations = relations(users, ({ many }) => ({
  products: many(products), // One user -> many products
  comments: many(comments), // One user -> many comments
}));

// Product Relations:a product belongs to one user and can have many comments
// 'one()' means one single related record, 'many()' meand multiple related records

export const productRelation = relations(products, ({ one, many }) => ({
  comments: many(comments),
  // 'fields'  the foreign key column in THIS table(products.userId)
  // 'reference' the primary key column in the RELATED table (users.id)
  user: one(users, { fields: [products.userId], references: [users.id] }), // One product can have one user
}));

//Comment Relations: A comment belongs to one user and one product
export const commentRelation = relations(comments, ({ one }) => ({
  //Comment's userID foreign key reference users.Id primary key
  users: one(users, { fields: [comments.userId], references: [users.id] }), // One comment -> one user

  //Comment's productId foreign key reference products.id primary key
  product: one(products, {
    fields: [comments.productId],
    references: [products.id], // One comment - one product
  }),
}));

//Type Inferrence
//USERS
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

//PRODUCTS
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

//COMMENTS
export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;
