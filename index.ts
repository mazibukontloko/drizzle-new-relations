import express from "express";
import cors from "cors";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { users, posts, usersToGroups } from "./db/schema";

const app = express();

app.use(cors())
app.use(express.json())

app.get("/api/home", async (req, res) => {
    try {
        const posts = await db.query.posts.findMany({
            with: {
                author: true,
            },
        });
        const groups = await db.query.groups.findMany({
            with: {
                verifiedUsers: true,
            },
        });
        const data = { posts, groups }

        res.json(data)
    } catch (error) {
        console.error("get error", error)
        res.status(500).json({message: "internal server error!", error })
    }
});

app.post("/api/home", async (req, res) => {
    try {
        const first = req.body.first
        const content = req.body.content
        const group_id = req.body.group_id
        
        const user = await db.insert(users).values({name: first}).returning()
        const post = await db.insert(posts).values({content, ownerId: user[0].id}).returning()
        const group = await db.insert(usersToGroups).values({userId: user[0].id, groupId: group_id}).returning()
        if(group_id === 3){
            await db.insert(usersToGroups).values({userId: user[0].id, groupId: 5})
        } else {
            await db.insert(usersToGroups).values({userId: user[0].id, groupId: 6})
        }
        const groups = await db.query.usersToGroups.findMany()
        res.json({user: user[0], post: post[0], groups})

    } catch (error) {
        console.error("post error", error)
        res.status(500).json({message: "internal server error!"})
    }
});

app.put("/api/home", async (req, res) => {
    try {
        const id = req.body.id
        const content = req.body.content

        await db.update(posts).set({content})
            .where(eq(posts.id, id))
        const post = await db.select().from(posts)
            .where(eq(posts.id, id))
        res.json(post)

    } catch (error) {
        console.error("put error", error)
        res.status(500).json({message: "internal server error!"})
    }
});

app.delete("/api/home", async (req, res) => {
    try {
        const id = req.body.id
        await db.delete(users).where(eq(users.id, id))
        res.json({message: `user ${id} deleted successfully!`})
    } catch (error) {
        console.error("delete error", error)
        res.status(500).json({message: "internal server error!"})
    }
});

app.listen(8081, () => console.log("start express server, for testing drizzle relations"));