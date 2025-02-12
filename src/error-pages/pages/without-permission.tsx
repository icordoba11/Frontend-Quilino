import React from "react";
import foto from '../../assets/images/without-permission.webp';
import { useNavigate } from "react-router-dom";
import '../styles/styles.css';
import { Fade } from "@mui/material";

const WithoutPermission: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Fade in={true} timeout={1000} appear={true}>
            <div className="cont-404">
                <img src={foto} alt="without permission" />
                <button
                    onClick={() => { navigate('/') }}
                >
                    Volver al menu
                </button>
            </div>
        </Fade>
    );
}

export default WithoutPermission;
