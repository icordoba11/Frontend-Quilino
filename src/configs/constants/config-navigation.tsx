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
            title: 'Empleo',
            path: paths.main.empleo.list,
            icon: <Iconify icon='tdesign:work-history' />,
          },
          {
            title: 'Multas',
            path: paths.main.multas.list,
            icon: <Iconify icon='solar:bill-list-outline' />,
          },
          {
            title: 'Recolección',
            path: paths.main.recoleccion.list,
            icon: <Iconify icon='mingcute:truck-line' />,
          },
          {
            title: 'Almacenamiento',
            path: paths.main.almacenamiento.list,
            icon: <Iconify icon='tdesign:mosque' />,
          },
          {
            title: 'Geoestadística',
            path: paths.main.geoEstadistica.list,
            icon: <Iconify icon='tdesign:map-information' />,
          },
        ],
      },
    ],
    [],
  );



  return data;
}
