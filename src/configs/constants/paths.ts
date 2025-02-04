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
        multas: {
            list: '/multas/list',
            create: '/multas/new',
            edit: '/multas/edit',
        },
        recoleccion: {
            list: '/recoleccion/list',
            create: '/recoleccion/new',
            edit: '/recoleccion/edit',
        },
        almacenamiento: {
            list: '/almacenamiento/list',
            create: '/almacenamiento/new',
            edit: '/almacenamiento/edit',
        },
        geoEstadistica: {
            list: '/geoEstadistica/list',
            create: '/geoEstadistica/new',
            edit: '/geoEstadistica/edit',
        },
        profile: {
            edit: '/profile/edit',
        },
        users: {
            list: '/users/list',
            edit: (id: string) => `/users/${id}/edit`,
        }

    },

};
