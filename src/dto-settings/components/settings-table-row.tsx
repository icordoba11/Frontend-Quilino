import { IconButton, TableCell, TableRow } from '@mui/material';
import Iconify from '../../shared/components/iconify/iconify';

type SettingsTableRowProps = {
    row: any;
    onIconClick: () => void;
};

export default function SettingsTableRow({ row, onIconClick }: SettingsTableRowProps) {
    const { nombre } = row;

    return (
        <TableRow hover>
            <TableCell sx={{ whiteSpace: 'nowrap' }}>
                {nombre}
            </TableCell>
            <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
                <IconButton onClick={onIconClick}>
                    <Iconify icon="material-symbols:edit" />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}
