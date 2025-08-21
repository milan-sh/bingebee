export interface Video {
    _id:string
    title:string
    videoFile:string
    thumbnail:string
    description:string
    duration:string
    updatedAt: string
    owner:string
}

export interface VideoUpload {
    title:string;
    description:string;
    videoFile:File | null;
    thumbnail: FileList | null;
}