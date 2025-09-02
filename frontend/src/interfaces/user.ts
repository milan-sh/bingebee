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
    subscribersCount:number;
    isSubscribed:boolean;
    fullName:string;
    username:string;
    avatar:string;
}

export interface ChannelProfile {
    _id:string;
    username:string;
    email:string;
    fullName:string;
    avatar:string;
    coverImage:string;
    subscribersCount:number;
    channelsSubscribedToCount:number;
    isSubscribed:boolean;
}

export interface Feedback {
    feedback:string
}