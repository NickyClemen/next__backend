import express, {
    Application,
    Router,
    Request,
    Response
} from 'express';

import UserProfile from '../../services/UserProfile.service';

export default async function userRouter(app:Application):Promise<void> {
    const router:Router = express.Router();
    app.use('/api', router);

    const userProfileService = UserProfile.getInstance();

    router.get('/books', async (req:Request, res:Response) => {
        const books = await userProfileService.findUserReadedBook('clemenicky');
        res.status(200).json({ books })
    });
}