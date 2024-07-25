import { Alert, Box, Grid, Typography, useMediaQuery, Button, IconButton } from "@mui/material";
import { useState } from "react";
import CustomButton from "../../components/ButtonLogin";
import Facebook from "../../img/facebook.svg";
import whatsapp from "../../img/whatsapp.svg";
import send from "../../img/send.svg";
import adorno1 from "../../img/adornos/Alogin_1.svg";
import robot from "../../img/avatar/robotn.svg";
import { useAuth } from "../../context/AuthLogin";
import { Navigate, useNavigate } from "react-router-dom";
import LoandingProgressBars from "../../components/Loanding";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Asegúrate de importar esto correctamente
import { AuthResponse } from "../../interface/interface";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const API_URL = "https://localhost:7151";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const isSmallScreen = useMediaQuery('(max-width:700px)');
    const [alertError, setAlertError] = useState<JSX.Element | null>(null);

    const auth = useAuth();
    const navigate = useNavigate();

    if (auth.isAuthenticated && auth.user) {
        const decodedToken: any = jwtDecode(auth.user.body.accessToken);
        const userRole = decodedToken.rol;

        if (userRole === "Reclutador") {
            return <Navigate to="/BienvenidoReclutador" />;
        } else {
            return <Navigate to="/dashboard" />;
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/Login/login`, { Email: email, Constrasena: password });
            const { result: token } = response.data;

            const userData: AuthResponse = {
                body: {
                    accessToken: token,
                },
            };

            const decodedToken: any = jwtDecode(token);
            const userRole = decodedToken.rol;

            auth.saveUser(userData);

            if (userRole === "Reclutador") {
                navigate("/BienvenidoReclutador");
            } else {
                navigate("/dashboard");
            }
        } catch {
            setAlertError(<Alert severity="error">Error al Iniciar Sesión</Alert>);
            setLoading(false);
        }
    };

    if (loading) {
        return <div><LoandingProgressBars /></div>;
    };

    return (
        <Box sx={{ height: '100vh' }}>
            <Grid container sx={{ height: '100%' }}>
                <Grid
                    item
                    xs={12}
                    sm={8}
                    lg={8}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: { xs: '20px', md: '50px', lg: '100px' },
                        height: '100vh',
                    }}
                >
                    <IconButton 
                        color="primary" 
                        onClick={() => navigate('/')}
                        sx={{ alignSelf: 'flex-start', mb: 2 }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h4" color="black" sx={{ marginBottom: '20px', fontSize: { xs: '24px', md: '28px' }, fontWeight: '700', textAlign: 'center' }}>
                        ¡Bienvenido de vuelta!
                    </Typography>
                    {alertError && (
                        <Box sx={{ width: '100%', maxWidth: '400px', marginBottom: '20px' }}>
                            {alertError}
                        </Box>
                    )}
                    <Grid sx={{ width: { xs: '100%', md: '70%', lg: '50%' } }}>
                        <form onSubmit={handleSubmit}>
                            <Typography sx={{ margin: '10px' }}>Correo:</Typography>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    marginBottom: '10px',
                                    borderRadius: '50px',
                                    border: '2px solid #21bbff',
                                    background: '#FFFFFF',
                                    boxSizing: 'border-box',
                                }}
                                required
                            />
                            <Typography sx={{ margin: '10px' }}>Contraseña:</Typography>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    marginBottom: '10px',
                                    borderRadius: '50px',
                                    border: '2px solid #21bbff',
                                    background: '#FFFFFF',
                                    boxSizing: 'border-box',
                                }}
                                required
                            />
                            <CustomButton
                                type="submit"
                                sx={{
                                    width: '100%',
                                    marginTop: '30px',
                                    borderRadius: '50px'
                                }}>
                                Iniciar sesión
                            </CustomButton>
                        </form>
                        <Typography sx={{ marginTop: '25px', textAlign: 'center' }}>
                            ¿Aún no tienes una cuenta?
                            <span 
                                style={{ color: '#21bbff', cursor: 'pointer', marginLeft: '15px' }}
                                onClick={() => navigate('/candidate-register')}
                            >
                                Registrate
                            </span>
                        </Typography>
                        <Grid
                            container
                            spacing={2}
                            sx={{
                                textAlign: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '20px',
                            }}
                        >
                            <Grid item>
                                <img src={Facebook} alt="Facebook" style={{ cursor: 'pointer' }} />
                            </Grid>
                            <Grid item>
                                <img src={whatsapp} alt="WhatsApp" style={{ cursor: 'pointer' }} />
                            </Grid>
                            <Grid item>
                                <img src={send} alt="Send" style={{ cursor: 'pointer' }} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        sx={{
                            position: 'absolute',
                            width: '200px',
                            height: '160px',
                            bottom: 0,
                            left: 0,
                            marginRight: '300px'
                        }}
                    >
                        <img src={adorno1} alt="" />
                    </Grid>
                </Grid>
                {!isSmallScreen && (
                    <Grid item xs={0} sm={4} lg={4} sx={{
                        background: '#21bbff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Grid item sx={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <img src={robot} alt="Robot" style={{ width: '80%', maxWidth: '500px', background: 'none' }} />
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
}

export default Login;
