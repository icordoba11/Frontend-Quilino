import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


interface ConfirmDialogProps extends Omit<DialogProps, 'title' | 'content'> {
    icon?: React.ReactNode;
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    content?: React.ReactNode;
    action?: React.ReactNode;
    open: boolean;
    onClose: () => void;
}
export default function ConfirmDialog({ title, subtitle, content, action, open, onClose, icon, ...other }: ConfirmDialogProps) {
    return (

        <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}
            PaperProps={{
                sx: {
                    borderRadius: 5,
                },
            }}
        >
            <DialogTitle sx={{ pt: 5, textAlign: 'center', }}>
                <Box display="flex" alignItems="center" gap={1}>
                    {icon && <Box sx={{ fontSize: '2rem' }}>{icon}</Box>}
                    {title}
                </Box>
                {subtitle && (
                    <Typography variant="subtitle2" sx={{ mt: 1, color: 'text.secondary', fontSize: '0.7rem' }}>
                        {subtitle}
                    </Typography>
                )}

            </DialogTitle>

            {content && <DialogContent sx={{ typography: 'body2', }}> {content} </DialogContent>}

            <DialogActions sx={{ p: 2 }} >
                {action}

                <Button variant="outlined" color="inherit" onClick={onClose}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>

    );
}