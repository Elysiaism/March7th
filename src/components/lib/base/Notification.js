
import { Alert, Backdrop, CircularProgress, Snackbar } from "@mui/material";
import { useTheme } from "@emotion/react";
export default function Notification({
    open,
    severity = 0,
    text = ""
}) {

    const messageType = [
        'info',
        'success',
        'warning',
        'error',
        'info'
    ]

    const theme = useTheme()
    console.log(theme.palette.primary.main)

    return (
        <Backdrop open={open} sx={{
            background: '#00000000',
            '& .msg': {
                boxShadow: '0px 0px 11px 0px rgb(70 70 70 / 10%)',
                width: '100%'
            }
        }}>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open
            >
                <Alert
                    // color="theme.palette.primary.main"
                    severity={messageType[severity]}
                    icon={severity === 4 ? <CircularProgress color="secondary" size={22} /> : undefined}
                >
                    {text}
                </Alert>
            </Snackbar>
        </Backdrop>
    )
}

const DEFAULT_MESSENGER = {
    open: false,
    severity: 0,
    title: "",
    text: ""
}

export {
    DEFAULT_MESSENGER
};
