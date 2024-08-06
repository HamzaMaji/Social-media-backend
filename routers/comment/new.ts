import { Router, Request, Response, NextFunction } from "express"
import Comment from "../../models/comment";
import Post from "../../models/post";

const router = Router()

router.post("/api/comment/new/:id", async (req: Request, res: Response, next: NextFunction) => {
    const { userName, content } = req.body;

    const { postId } = req.params;

    if (!content) {
        const error = new Error('Content is required') as CustomError
        error.status = 400
        return next(error)
    }
    const newComment = new Comment({
        userName: userName ? userName : "anonymous",
        content: content,
    });
    await newComment.save()

    let updatedPost;
    try {
        updatedPost = await Post.findOneAndUpdate(
            { id: postId },
            { $push: { comments: newComment } },
            { new: true }
        )
    } catch (err) {
        console.log(err)
        const error = new Error("Couldn't update post")
        return next(error)
    }



    res.status(201).send(updatedPost)


})

export { router as newCommentRouter }