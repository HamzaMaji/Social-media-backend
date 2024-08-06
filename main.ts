import * as dotenv from "dotenv"
dotenv.config()

import express, { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import cors from "cors"
import {
    newPostRouter,
    deletePostRouter,
    updatePostRouter,
    showPostRouter,
    newCommentRouter,
    deleteCommentRouter,
    updateCommentRouter,
    showCommentRouter
} from "./routers"


const app = express()

app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// using all Post routers
app.use(newPostRouter)
app.use(deletePostRouter)
app.use(showPostRouter)
app.use(updatePostRouter)

// using all Comment routers
app.use(newCommentRouter)
app.use(deleteCommentRouter)
app.use(showCommentRouter)
app.use(updateCommentRouter)

app.all('*', (req, res, next) => {
    const error = new Error("Not found!") as CustomError
    error.status = 404
    next(error)
})

declare global {
    interface CustomError extends Error {
        status?: number
    }
}

app.use((error: CustomError, req: Request, res: Response, next: NextFunction) => {
    if (error.status) {
        return res.status(error.status).json({ message: error.message })
    }

    return res.status(500).json({ message: "Something went wrong" })
})

const start = async () => {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI required!")
    try {
        await mongoose.connect(process.env.MONGO_URI)
    } catch (err) {
        console.log(err)
        throw new Error("Database error")
    }
    app.listen(3000, () => console.log("Server is up and running on port 3000"))
}

start()


