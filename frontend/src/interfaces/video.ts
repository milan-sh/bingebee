export interface Video {
    _id:string
    title:string
    videoFile:string
    thumbnail:string
    description:string
    duration:number
    views:number,
    isPublished:boolean,
    updatedAt: string,
    createdAt:string,
    owner:{
        _id:string,
        fullName:string,
        avatar:string
    }
}

export interface VideoUpload {
    title:string;
    description:string;
    videoFile:File | null;
    thumbnail: FileList | null;
}