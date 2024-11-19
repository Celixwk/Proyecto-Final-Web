import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import appFirebase from '../Firebase/FirebaseConfig';
import { getAuth, signOut } from 'firebase/auth';
import './Header.css';

const auth = getAuth(appFirebase);

const Header = () => {
    return (
        <Box className="header-container">
            <Typography variant="h3" className="header-title">
                Bitácora Botánica
            </Typography>
            <Typography variant="subtitle1" className="header-subtitle">
                Registro de muestreos y observaciones botánicas
            </Typography>
            <Box 
                display="flex" 
                justifyContent="flex-end" // Alinea los botones a la derecha
                mt={2} 
                position="absolute" // Posiciona los botones de forma absoluta
                right={20} // Ajusta la posición desde la derecha
                top={20} // Ajusta la posición desde la parte superior
            >
                <Button 
                    onClick={() => signOut(auth)}
                    variant="outlined"
                    color="inherit"
                    className="logout-button"
                    style={{ marginLeft: '10px' }} // Espaciado entre los botones
                >
                    Cerrar Sesión
                </Button>
            </Box>
        </Box>
    );
};

export default Header;