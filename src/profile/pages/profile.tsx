import { useState } from "react";
import { Tabs, Tab, CssBaseline, Box, Typography, CardMedia, Divider } from "@mui/material";
import ProfileForm from "../components/profile-form";
import ChangePasswordForm from "../components/change-password";


const Profile = () => {
    const [value, setValue] = useState(0);

    return (
        <>
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                <Box>
                    <Box>
                        <CardMedia
                            component="img"
                            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH5sFjZPx1Yzi1b9_FpQzrxqgsjv2DPAp81Q&s"
                            alt="Profile"
                            sx={{
                                borderRadius: '50%',
                                mb: 2,
                                mx: 'auto',
                                width: 100,
                                height: 100
                            }}
                        />

                        <Typography variant="h6" fontWeight="bold" textAlign={"center"} sx={{ mb: 3 }}>
                            Mi Perfil
                        </Typography>
                        <Divider />
                    </Box>
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={(_, newValue) => setValue(newValue)}
                        sx={{ borderLeft: 1, borderColor: 'divider', minWidth: 200 }}

                    >


                        <Tab label="Información Personal" />
                        <Tab label="Cambiar Contraseña" />
                    </Tabs>
                </Box>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

                    {value === 0 && <ProfileForm />}
                    {value === 1 && <ChangePasswordForm />}
                </Box>
            </Box>
        </>
    );
};

export default Profile;
