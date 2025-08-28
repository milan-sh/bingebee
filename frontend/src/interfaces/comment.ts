import type { UserInterface } from "./user";
import type { Video } from "./video";

export interface Comment {
    _id:string;
    content:string;
    video:Video;
    owner:UserInterface;
    createdAt: string;
}