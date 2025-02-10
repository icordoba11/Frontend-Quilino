import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import { User } from '../types/types';
import Iconify from '../../shared/components/iconify/iconify';
import CustomPopover from '../../shared/components/popover/custom-popover';


type UserTableRowProps = {
    row: User;
    onEdit: () => void;

};

export default function UserTableRow({ row, onEdit }: UserTableRowProps) {
    const { nombreUsuario, email, rol, fechaRegistro } = row;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    

    return (
        <>
            <TableRow hover>

                <TableCell sx={{ whiteSpace: 'nowrap' }}>{nombreUsuario}</TableCell>


                <TableCell sx={{ whiteSpace: 'nowrap' }}>{email}</TableCell>

                <TableCell sx={{ whiteSpace: 'nowrap' }}>{rol}</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>{fechaRegistro}</TableCell>

                <TableCell align='right' sx={{ px: 1, whiteSpace: 'nowrap' }}>
                    <IconButton color={open ? 'inherit' : 'default'} onClick={handlePopoverOpen}>
                        <Iconify icon='eva:more-vertical-fill' />
                    </IconButton>
                </TableCell>
            </TableRow>

            <CustomPopover open={open} onClose={handlePopoverClose} anchorEl={anchorEl}>
                <MenuItem
                    onClick={() => {
                        onEdit();
                        handlePopoverClose();
                    }}
                >
                    <Iconify icon='solar:pen-bold' />
                    Edit
                </MenuItem>
                <MenuItem
                    onClick={() => {

                        handlePopoverClose();
                    }}
                    sx={{ color: 'error.main' }}
                >
                    <Iconify icon='solar:trash-bin-trash-bold' />
                    Delete
                </MenuItem>
            </CustomPopover>
        </>
    );
}