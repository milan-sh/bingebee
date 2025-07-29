import type { InputHTMLAttributes } from "react";

export interface SignupFormValues {
    username: string;
    email: string;
    fullName: string;
    password: string;
    avatar: FileList;
    coverImage?: FileList;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    type: 'text' | 'password' | 'email' | 'number' | 'file' | string;
    className?: string;
}