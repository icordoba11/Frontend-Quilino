import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface HeaderProps {
    onOpenNav: () => void;
}

export default function Header({ onOpenNav }: HeaderProps) {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={onOpenNav} sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6">Dashboard</Typography>
            </Toolbar>
        </AppBar>
    );
}
