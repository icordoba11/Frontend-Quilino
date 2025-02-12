import { IconButton, TableCell, TableRow } from '@mui/material';
import Iconify from '../../shared/components/iconify/iconify';
import { HistoricListData } from '../types/types';

type HistoricTableRowProps = {
    row: HistoricListData;
    onEdit: () => void;
    onIconClick: () => void;
};

export default function HistoricTableRow({ row, onIconClick }: HistoricTableRowProps) {
    const { FechaLiquidacion } = row;

    return (
        <TableRow hover>
            <TableCell sx={{ whiteSpace: 'nowrap' }}>
                {FechaLiquidacion}
            </TableCell>
            <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
                <IconButton onClick={onIconClick}>
                    <Iconify icon="material-symbols:file-copy-outline" />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}
