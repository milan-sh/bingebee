import type { UserInterface } from "./user";

export interface Tweet {
    _id:string;
    content:string;
    owner:UserInterface;
    createdAt:string;
}