import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

interface ConfirmDialogProps extends Omit<DialogProps, 'title' | 'content'> {
    title?: React.ReactNode;
    content?: React.ReactNode;
    action?: React.ReactNode;
    open: boolean;
    onClose: () => void;
}
export default function ConfirmSelected({ title, content, action, open, onClose, ...other }: ConfirmDialogProps) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    return (

        <Dialog fullWidth sx={{backgroundColor: 'red'}}  open={open} onClose={onClose} {...other}
        PaperProps={{
            sx: {
                borderRadius: 3,     
            },
        }}
        >
            <DialogTitle sx={{ pt: 5, textAlign: 'center', }}>{title}</DialogTitle>

            {content && <DialogContent sx={{ typography: 'body2',  }}> {content} </DialogContent>}

            <DialogActions sx={{ p: 2 }} >
                {action}

            </DialogActions>
        </Dialog>

    );
}