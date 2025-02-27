import { Typography, Box, Button } from "@mui/material";
import { motion } from "framer-motion";
import Logo from '../../assets/images/logo-municipalidad.webp';
import { useNavigate } from 'react-router-dom';


const DashboardPage = () => {

    const navigate = useNavigate();
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <Box sx={{
                backgroundColor: 'white', color: 'gray.600', padding: 2, 
                height: 'calc(100vh - 64px)', // Ajustar para que no haga scroll y se vea todo en pantalla
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between', 
                dark: { backgroundColor: 'slate.900', color: 'gray.100' }
             }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'center', alignItems: 'center', px: { md: 24 }, py: { md: 10 }, gap: 3 }}>
                    <Box sx={{ flexGrow: 1, mb: 2 }}>
                        {/* Título con animación */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: 'gray.900', dark: { color: 'gray.100' }, textAlign: 'center' }}>
                                Portal de Gestión
                            </Typography>
                        </motion.div>

                        {/* Descripción con animación */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            <Typography sx={{ mb: 2, px: 2, color: 'gray.700', dark: { color: 'gray.300' }, textAlign: 'left' }}>
                                "Quilino Empleados es una plataforma de gestión para la municipalidad de Quilino que facilita el registro,
                                seguimiento y administración de los empleados, optimizando procesos administrativos y mejorando la eficiencia en los servicios municipales."
                            </Typography>
                        </motion.div>

                        {/* Botones con animación */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1 }}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ borderRadius: 1, paddingX: 3, paddingY: 1 }}   
                                    onClick={() => navigate('/empleo/list')}                    
                                >
                                    Comienza a gestionar
                                </Button>
                                <Button
                                    variant="outlined"
                                    sx={{ borderRadius: 1, paddingX: 3, paddingY: 1 }}
                                    onClick={() => navigate('/upload-files/list')}   
                                >
                                    Carga tu primer recibo
                                </Button>
                            </Box>
                        </motion.div>
                    </Box>

                    {/* Imagen con animación */}
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, type: 'spring', stiffness: 100 }}
                        style={{ maxWidth: 400, width: '100%' }}
                    >
                        <img
                            className="object-cover object-center rounded"
                            alt="hero"
                            src={Logo}
                            style={{ maxWidth: 600, maxHeight: 300 }}
                        />
                    </motion.div>
                </Box>

            </Box>
        </motion.div>
    );
};

export default DashboardPage;
