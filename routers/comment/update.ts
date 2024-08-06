import { NextFunction, Request, Response, Router } from 'express'
import Comment from '../../models/comment';

const router = Router()

router.post('api/post/update/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    const { content } = req.body;

    if (!id) {
        const error = new Error("Comment id is required") as CustomError
        error.status = 400
        return next(error)
    }
    let updatedComment;
    try {
        updatedComment = await Comment.findOneAndUpdate({ _id: id },
            { $set: { content: content } },
            { new: true }
        )
    } catch (err) {
        const error = new Error("Comment cannot be updates!") as CustomError
        error.status = 400;
        return next(error)
    }
    res.status(200).send(updatedComment)

})

export { router as updateCommentRouter }