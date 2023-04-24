import {Box, CircularProgress} from "@mui/material";

export default function Loading() {
    return (
        <Box sx={{
            alignItems: 'center',
            background: 'white',
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            justifyContent: 'center',
            left: 0,
            position: 'fixed',
            top: 0,
            width: '100vw'
        }}>
            <CircularProgress color="primary" size={20}/>
        </Box>
    )
}