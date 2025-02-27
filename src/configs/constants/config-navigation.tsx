import { useMemo } from 'react';
import { paths } from './paths';
import Iconify from '../../shared/components/iconify/iconify';
import { useAuth } from '../../auth/components/auth-context';

interface NavItem {
  title: string;
  path: string;
  icon: JSX.Element;
}

export function useNavData() {
  const { decryptData } = useAuth();

  if (!decryptData) {
    throw new Error('decryptData function is not available in AuthContext');
  }

  const rol = sessionStorage.getItem('userRole');
  let decryptedRole = '';

  if (rol) {
    decryptedRole = decryptData(rol);
  }

  const data = useMemo(() => {

    const navItems: NavItem[] = [
      {
        title: 'Dashboard',
        path: paths.main.dashboard,
        icon: <Iconify icon='ri:book-read-line' />,
      },
      {
        title: 'Empleados',
        path: paths.main.empleo.list,
        icon: <Iconify icon='tdesign:work-history' />,
      },
      {
        title: 'Cargar archivos',
        path: paths.main.uploadFiles.list,
        icon: <Iconify icon='material-symbols:drive-folder-upload-outline' />,
      },
      {
        title: 'Configuracion',
        path: paths.main.settings.generalList,
        icon: <Iconify icon='material-symbols:settings-b-roll-outline-rounded' />,
      },
    ];


    if (decryptedRole === 'Administrador') {
      navItems.push({
        title: 'Usuarios',
        path: paths.main.users.list,
        icon: <Iconify icon='material-symbols:supervised-user-circle' />,
      });
    }

    return [{ items: navItems }];
  }, [rol]);

  return data;
}
