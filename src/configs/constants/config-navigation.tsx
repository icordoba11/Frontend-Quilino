import { useMemo } from 'react';
import { paths } from './paths';
import Iconify from '../../shared/components/iconify/iconify';

export function useNavData() {
  const data = useMemo(
    () => [
      {
        items: [
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
            title: 'Usuarios',
            path: paths.main.users.list,
            icon: <Iconify icon='material-symbols:supervised-user-circle' />,
          },
        ],
      },
    ],
    [],
  );



  return data;
}
