import { StarBorderOutlined } from "@mui/icons-material"
import { Button, Typography, useTheme } from "@mui/material"

function Chip({
    className,
    color = "primary",
    button,
    onClick,
    name,
    sx,
    startIcon
}) {

    const theme = useTheme()
    const style = {
        height: '30px',
        textTransform: 'none',
        borderRadius: '16px',
        fontSize: '13px',
        '& .MuiButton-startIcon': {
            marginRight: '3px'
        }
    }


    if (button) {
        return (
            <Button
                variant="outlined"
                className={`Chip ${className}`}
                color={color}
                onClick={onClick}
                startIcon={startIcon}
                size="small"
                sx={{
                    ...style,
                    ...sx
                }}
            >
                {name}
            </Button>
        )
    } else {
        return (
            <Typography
                className={`Chip ${className}`}
                component={'div'}
                sx={{
                    border: `1px solid ${theme.palette[color].light}`,
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '3px 9px',
                    backgroundColor: 'white',
                    boxSizing: 'border-box',
                    '& svg:first-of-type': {
                        fontSize: '18px',
                        marginRight: '4px'
                    },
                    ...style,
                    ...sx
                }}
            >
                {startIcon}
                <div>
                    {name}
                </div>
            </Typography>
        )
    }
}

export default Chip