import express, {
    Application,
    Router,
    Request,
    Response
} from 'express';

import axios from 'axios';

import UserProfile from '../../services/UserProfile.service';
import IUserProfile from '../../interfaces/IUserProfile.interface';

export default async function userRouter(app:Application):Promise<void> {
    const router:Router = express.Router();
    app.use('/api', router);

    const userProfileService = UserProfile.getInstance();

    router.get('/user-profile', async (req:Request, res:Response) => {
        const { authorization } = req.headers;

        if(authorization !== undefined && !Array.isArray(authorization)) {
            const accessToken = authorization.replace('Bearer ', '');
            const { data: { userProfile } } = await axios.get('http://localhost:3001/api/auth/user-profile', {
                headers: {
                    Authorization: `Bearer ${ accessToken }`,
                }
            });

            const [books] = await userProfileService.findUserBooks((userProfile as IUserProfile).username);

            if(books) {
                const {
                    bookReaded,
                    bookReading,
                    bookToRead,
                    abandonedBook
                } = books;

                return res.status(200).json({
                    userProfile,
                    bookReaded,
                    bookReading,
                    bookToRead,
                    abandonedBook
                });
            }

            return res.status(200).json({
                userProfile,
                bookReaded: undefined,
                bookReading: undefined,
                bookToRead: undefined,
                abandonedBook: undefined
            });
        }

        return res.status(403).json({ message: 'no estás autorizado.' });
    });
}