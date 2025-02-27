export const paths = {
    comingSoon: '/coming-soon',
    maintenance: '/maintenance',
    page403: '/403',
    page404: '/404',
    withoutPermission: '/without-permission',
    auth: {
        signIn: '/auth/sign-in',
        confirmSignIn: '/auth/confirm-sign-in',
        resetPassword: '/auth/reset-password',
        forgotPassword: '/auth/forgot-password',
    },
    main: {
        dashboard: '/dashboard',
        empleo: {
            list: '/empleo/list',
            create: '/empleo/new',
            edit: '/empleo/edit',
        },
        historic: {
            list: (id: string, name:string, legajo:string) => `/historics/${id}/${name}/${legajo}/list`,

        },
        uploadFiles: {
            list: '/upload-files/list'
        },

        profile: {
            edit: '/profile/edit',
        },
        users: {
            list: '/users/list',
            new: '/users/new',
            edit: (id: string) => `/users/${id}/edit`,
        },
        settings: {
            generalList: '/settings/general-list',
            list: (nombre: string) => `/settings/${nombre}/list`,
            new: '/settings/new',
            edit: (id: number, nombre: string) => `/settings/${id}/edit/${nombre}`,
        },

    },

};
