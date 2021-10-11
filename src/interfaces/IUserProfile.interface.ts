import IBook from './IBook.interface';

export default interface IUserProfile {
    username:string;
    password:string;
    email:string;
    name:string;
    lastname:string;
    age:number;
    readed:IBook[];
    reading:IBook[];
    abandoned:IBook[];
    toRead:IBook[];
    isAdmin:boolean;
}