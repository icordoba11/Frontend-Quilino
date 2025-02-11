export const paths = {
    comingSoon: '/coming-soon',
    maintenance: '/maintenance',
    page403: '/403',
    page404: '/404',
    page500: '/500',
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
            list: (id: string) => `/historics/${id}/${name}/list`,

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
        }

    },

};
