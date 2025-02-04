import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';


interface ConfirmDialogProps extends Omit<DialogProps, 'title' | 'content'> {
    title?: React.ReactNode;
    content?: React.ReactNode;
    action?: React.ReactNode;
    open: boolean;
    onClose: () => void;
}
export default function ConfirmDialog({ title, content, action, open, onClose, ...other }: ConfirmDialogProps) {
    return (

        <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}
        PaperProps={{
            sx: {
                borderRadius: 5,     
            },
        }}
        >
            <DialogTitle sx={{ pt: 5, textAlign: 'center', }}>{title}</DialogTitle>

            {content && <DialogContent sx={{ typography: 'body2',  }}> {content} </DialogContent>}

            <DialogActions sx={{ p: 2 }} >
                {action}

                <Button variant="outlined" color="inherit" onClick={onClose}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>

    );
}