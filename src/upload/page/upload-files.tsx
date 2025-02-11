import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Typography, Box, Paper, IconButton } from '@mui/material';
import { CloudUpload as CloudUploadIcon, PictureAsPdf as PdfIcon } from '@mui/icons-material';
import { Fade } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import CustomBreadcrumbs from '../../shared/components/breadcrumbs/bread-crums';
import uploadService from '../service/upload';



const FileUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const { enqueueSnackbar } = useSnackbar();

    const [loadingButton, setLoadingButton] = useState<boolean>(false);


    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'application/pdf': [] }, 
        multiple: false,
        onDrop: (acceptedFiles: File[]) => {
            setFile(acceptedFiles[0]);
        },
    });

    const { mutate: importPdf } = useMutation({
        mutationFn: async (file: File) => {
            if (!file) throw new Error('No se ha seleccionado ningún archivo');
            setLoadingButton(true);
            return uploadService.importPdf(file);
        },
        onSuccess: () => {
            enqueueSnackbar('Importación de PDF exitosa', { variant: 'success' });
            setLoadingButton(false);
            setFile(null);
        },
        onError: (error: Error) => {
            enqueueSnackbar('Error en la importación', { variant: 'error' });
            setLoadingButton(false);
        },
    });

    return (
        <Fade in={true} timeout={1000}>
            <Box
                sx={{
                    display: 'flex',
                    p: 5,
                    alignItems: 'center',
                    minHeight: '100vh',
                    backgroundColor: '#f4f6f8',
                    flexDirection: 'column',
                }}
            >
                <CustomBreadcrumbs
                    heading="Carga de archivos"
                    links={[
                        { name: 'Carga de archivos' },

                    ]}
                    sx={{
                        mb: { xs: 3, md: 5 },
                    }}
                />
                <Paper
                    sx={{
                        padding: '40px',
                        width: '500px',
                        textAlign: 'center',
                        borderRadius: '12px',
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                        backgroundColor: '#ffffff',
                    }}
                >
                    <Box
                        {...getRootProps()}
                        sx={{
                            padding: '40px',
                            textAlign: 'center',
                            borderRadius: '12px',
                            border: '2px dashed #1976d2',
                            backgroundColor: '#f0f4ff',
                            cursor: 'pointer',
                            transition: '0.3s all ease-in-out',
                            '&:hover': { backgroundColor: '#e3f2fd' },
                            margin: 'auto',
                        }}
                    >
                        <input {...getInputProps()} />
                        {!file ? (
                            <>
                                <CloudUploadIcon sx={{ fontSize: '50px', color: '#1976d2' }} />
                                <Typography variant="h6" sx={{ marginTop: '20px', color: '#333' }}>
                                    Arrastra y suelta un archivo PDF aquí
                                </Typography>
                                <Typography variant="body2" sx={{ marginTop: '9px', color: '#666' }}>
                                    O haz clic para seleccionar un archivo
                                </Typography>
                            </>
                        ) : (
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <PdfIcon sx={{ fontSize: '50px', color: '#1976d2' }} />
                                <Typography variant="body1" sx={{ marginTop: '15px', color: '#333', fontWeight: 'bold' }}>
                                    {file.name}
                                </Typography>
                                <IconButton onClick={() => setFile(null)} sx={{ color: 'red', marginTop: '10px' }}>
                                    X
                                </IconButton>
                            </Box>
                        )}
                    </Box>
                </Paper>
                {file && (
                    <Button
                        variant="contained"
                        sx={{ mt: 5 }}
                        onClick={() => {
                            importPdf(file);
                        }}
                        disabled={loadingButton}
                    >
                        {loadingButton ? 'Importando...' : 'Importar'}
                    </Button>
                )}
            </Box>
        </Fade>
    );
};

export default FileUpload;
