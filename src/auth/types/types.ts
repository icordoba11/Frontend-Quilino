export interface UserData {
    NombreUsuario:string;
    Email:string;
    Rol:string;
    Contrasena:string;

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
    NombreUsuario: string;
    Contrasena: string;
}

export interface UserResponse {
    isSuccess: boolean;
    id: number;
    rol: string;
    token: string;

}