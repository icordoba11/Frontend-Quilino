import { useQuery } from '@tanstack/react-query';
import TabLayout from '../../shared/components/layouts/tab-layout';
import SignInForm from '../components/sign-in/sign-in-form';
import SignUpForm from '../components/sign-up/sign-up-form';
import LoadingScreen from '../../shared/components/chargers/loading-screen';
import userService from '../services/login';

const Auth = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['checkUsersExist'],
        queryFn: () => userService.checkUsersExist(),
    });

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (isError) {
        return <div>Error al verificar usuarios.</div>;
    }


    const isSignUpDisabled = !data?.state;

    const tabs = [
        {
            value: 'signIn',
            label: 'Inicio de Sesión',
            children: <SignInForm />,
        },
        {
            value: 'register',
            label: 'Registro',
            children: <SignUpForm />,
            disabled: isSignUpDisabled,
            
        },
    ];

    return <TabLayout tabs={tabs} />;
};

export default Auth;
