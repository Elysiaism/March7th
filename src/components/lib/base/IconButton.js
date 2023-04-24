import {IconButton as Button, Tooltip} from "@mui/material";

export default function IconButton({Icon, size = 25, tooltip, tooltipPosition = 'top', children, sx, ...props}) {

    const IconButtonBase = () => (
        <Button
            sx={{
                width: `${size}px`,
                height: `${size}px`,
                minWidth: `${size}px`,
                minHeight: `${size}px`,
                '& svg': {
                    width: `${size * 0.66}px`,
                    height: `${size * 0.66}px`,
                    minWidth: `${size * 0.66}px`,
                    minHeight: `${size * 0.66}px`,
                },
                ...sx
            }}
            {...props}
        >
            <Icon fontSize={"small"}/>
            {children}
        </Button>
    )

    return (
        tooltip ?
            <Tooltip
                title={tooltip}
                placement={tooltipPosition}
                arrow
                enterDelay={1000}
            >
                <IconButtonBase/>
            </Tooltip>
            :
            <IconButtonBase/>
    )
}