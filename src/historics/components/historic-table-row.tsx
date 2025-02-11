import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import Iconify from '../../shared/components/iconify/iconify';
import CustomPopover from '../../shared/components/popover/custom-popover';
import { HistoricListData } from '../types/types';

type HistoricTableRowProps = {
    row: HistoricListData;
    onEdit: () => void;
};

export default function HistoricTableRow({ row }: HistoricTableRowProps) {
    const { NombreArchivo, FechaLiquidacion, Empleado } = row;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };



    return (
        <>
            <TableRow hover>

                <TableCell sx={{ whiteSpace: 'nowrap' }}>{NombreArchivo}</TableCell>

                <TableCell sx={{ whiteSpace: 'nowrap' }}>{FechaLiquidacion}</TableCell>

                <TableCell sx={{ whiteSpace: 'nowrap' }}>{Empleado?.nombre}</TableCell>

                <TableCell align='right' sx={{ px: 1, whiteSpace: 'nowrap' }}>
                    <IconButton>
                        <Iconify icon='material-symbols:file-copy-outline' />
                    </IconButton>
                </TableCell>
            </TableRow>


        </>
    );
}
