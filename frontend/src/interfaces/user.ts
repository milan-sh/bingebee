export interface UserInterface {
    _id:string;
    username:string;
    email:string;
    fullName:string;
    avatar:string;
    coverImage:string;
    watchHistory: string[];
    createdAt:string;
    updatedAt:string;
}

export interface subscribedChannel{
    _id:string;
    subscriber:string;
    channel:{
        _id:string;
        email:string;
        username:string;
        fullName:string;
        avatar:string;
    }
}