import { Router, Response, Request, NextFunction } from "express"
import Post from "../../models/post";
import Comment from "../../models/comment";

const router = Router()

router.get('/api/comment/show/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    let comment;
    try {

        comment = await Comment.findOne({ _id: id })
        await Post.findOneAndDelete({ _id: id })
    } catch (err) {
        const error = new Error("Couldn't find post") as CustomError
        error.status = 401
        next(error)
    }
    res.status(200).send(comment)
})

router.get("/api/comment/show", async (req: Request, res: Response, next: NextFunction) => {
    const allComments = await Post.find()
    return res.status(200).send(allComments)
})


export { router as showCommentRouter }