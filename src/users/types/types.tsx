export interface User {
    id?: string;
    nombreUsuario: string;
    email: string
    rol: string;
    fechaRegistro: string;
    password?: string;
}

export type Rol = {
    role: string;
}


export type ChangePassword = {
    newPassword: string;
    oldPassword: string;
    repeatNewPassword: string;
}