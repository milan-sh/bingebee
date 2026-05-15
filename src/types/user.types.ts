export type User = {
    _id:string;
    username:string;
    email:string;
    fullName:string;
    avatar?:string;
    coverImage?:string;
    watchHistory?:string[];
    createdAt:Date;
    updatedAt:Date;
}