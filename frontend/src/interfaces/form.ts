import type React from "react";
import type { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    type: 'text' | 'password' | 'email' | 'number' | 'file' | string;
    className?: string;
}

export interface SignupFormValues {
    username: string;
    email: string;
    fullName: string;
    password: string;
    avatar: FileList;
    coverImage?: FileList;
}

export interface LoginFormValues {
    username: string;
    email: string;
    password: string;
}

export interface ButtonInterface {
    children:React.ReactNode
    onClick?: () => void;
    disabled?: boolean; 
    className?: string; 
    type?:"submit" | "reset" | "button" | undefined;
}

export interface UpdateVideoFormValues {
    title: string;
    description: string;
    thumbnail:  FileList | string;
}

export interface UpdateCoverImage {
    coverImage:FileList | string;
}

export interface UpdateAvatarImage {
    avatar:FileList | string;
}