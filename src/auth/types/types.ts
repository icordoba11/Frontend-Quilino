export interface UserData {

    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    role?: string;

}

export interface CreateUserResponse {
    isSuccess: boolean;
    message: string;
}

export interface RoleData {
    userId: string;
    role: string;

}

export interface LoginData {
    email: string;
    password: string;
}