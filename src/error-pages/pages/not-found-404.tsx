import React from "react";
import { Button, Fade } from "@mui/material";
import foto from '../../assets/images/404.svg';
import { useNavigate } from "react-router-dom";
import '../styles/styles.css';


const ErrorPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Fade in={true} timeout={1000} appear={true}>
            <div className="cont-404">
                <img src={foto} alt="svg" />
                <Button
                    onClick={() => { navigate('/') }}
                >
                    Volver al menu
                </Button>
            </div>
        </Fade>
    );
}

export default ErrorPage;
