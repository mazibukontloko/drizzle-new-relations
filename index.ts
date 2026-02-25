import express from "express";
import cors from "cors";

import { db } from "./db";
import { users } from "./db/schema";

const app = express();

app.use(cors())
app.use(express.json())

app.get("/api/home", async (req, res) => {
    try {
        const uss = await db.select().from(users).all()
        console.log("uss - ", uss)
        res.json(uss)
    } catch (error) {
        console.error("get error", error)
        res.status(500).json({message: "internal server error!"})
    }
});

app.post("/api/home", async (req, res) => {
    try {
        // console.log("req -- ", req.body.first_name)
        const first = req.body.first
        const user = await db.insert(users).values({name: first}).returning()
        res.json(user)
    } catch (error) {
        console.error("post error", error)
        res.status(500).json({message: "internal server error!"})
    }
});

app.listen(8081, () => console.log("start express server, for testing drizzle relations"));