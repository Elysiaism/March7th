import { Box, Typography, useTheme } from '@mui/material'

function Paper({
    className,
    color = 'primary',
    bgColor = ['primary', '00'],
    bgHover,
    children,
    border,
    noSelect,
    sx = {},
    onClick,
    shadow,
    gap = '5px',
    margin = '20px 10px',
    padding = '5px',
    flexDirection = 'column',
    flexWrap = 'wrap',
    alignItems = 'none',
    ...props
}) {

    const theme = useTheme()

    return (
        <Typography
            className={`Paper ${className}`}
            component='div'
            color={color}
            sx={{
                display: 'flex',
                overflow: 'hidden',
                flexDirection: flexDirection,
                borderRadius: '16px',
                flexWrap: flexWrap,
                padding: padding,
                margin: margin,
                gap: gap,
                alignItems: alignItems,
                boxShadow: shadow ? '0px 0px 5px 0px rgb(70 70 70 / 10%)' : 'none',
                border: border ? `1px solid ${theme.palette[color].light}` : 'none',
                userSelect: noSelect ? 'none' : 'inherit',
                backgroundColor: theme.palette[bgColor[0]].light + bgColor[1],
                transition: 'all .2s ease-in-out',
                ...(bgHover && {
                    '&:hover': {
                        backgroundColor: theme.palette[bgHover[0]].light + bgHover[1],
                    },
                }),
                ...sx
            }}
            onClick={onClick}
            {...props}
        >
            {children}
        </Typography>
    )
}

export default Paper