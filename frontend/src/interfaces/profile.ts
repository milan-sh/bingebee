export interface UpdatePersonalInfo {
    fullName:string;
    email:string;
}

export interface UpdatePassword{
    oldPassword:string;
    newPassword:string;
    confirmPassword:string;
}