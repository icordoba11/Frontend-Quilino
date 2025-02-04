import TabLayout from '../../shared/components/layouts/tab-layout';
import SignInForm from '../components/sign-in/sign-in-form'
import SignUpForm from '../components/sign-up/sign-up-form';

const Auth = () => {
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
        },
    ];

    return <TabLayout tabs={tabs} />;
};

export default Auth;
