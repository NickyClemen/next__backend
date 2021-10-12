import database from '../../../mongo__backend__db';

import UserProfileService from '../../../mongo__backend__db/dist/services/User.service';

import IUserProfile from '../interfaces/IUserProfile.interface';

export default class UserProfile {
    private static instance:UserProfile;
    private userProfile:Promise<UserProfileService>;

    private constructor() {
        this.userProfile = UserProfile._init();
    }

    private static async _init() {
        const { userProfile } = await database();
        return userProfile;
    }

    public static getInstance():UserProfile {
        if(!UserProfile.instance) {
            UserProfile.instance = new UserProfile();
        }

        return UserProfile.instance;
    }

    /**
    * Filtra un usuario por username.
    * @async
    * @method
    * @param {String} username
    * @returns {UserProfile} usuario.
    */
    async findUserByUsername(username:string):Promise<IUserProfile|null> {
        return (await this.userProfile).findUserByUsername(username)
            .then((response:unknown) => response as IUserProfile);
    }

    /**
    * Filtra la lista de libros vinculada a un usuario por username.
    * @async
    * @method
    * @param {String} username
    * @returns {IBook[]} Array con los valores por leído, por leer, abandonado y leyendo.
    */
    async findUserBooks(username:string) {
        return (await this.userProfile).findUserBooks(username)
            .catch((err:unknown) => (err as Error).message);
    }
}
