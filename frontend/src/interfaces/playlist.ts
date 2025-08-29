import type { UserInterface } from "./user";

export interface Playlist {
    _id:string;
    name:string;
    description:string;
    owner:UserInterface;
    videos: {
        _id:string;
        thumbnail:string;
    }[];
    createdAt:string;
}

export interface CreatePlaylistRequest {
    name: string;
    description: string;
}
