import { Router, Response, Request, NextFunction } from "express"
import Post from "../../models/post";
const router = Router()

router.get('/api/post/show/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    let post;
    try {

        post = await Post.findOne({ _id: id }).populate("comments")
    } catch (err) {
        const error = new Error("Couldn't find post") as CustomError
        error.status = 401
        next(error)
    }
    res.status(200).send(post)
})

router.get("/api/post/show", async (req: Request, res: Response, next: NextFunction) => {
    const allPosts = await Post.find().populate("comments")
    return res.status(200).send(allPosts)
})


export { router as showPostRouter }