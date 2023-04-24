import { Button, Tooltip } from "@mui/material"

export default function AbsButton({
    tooltip,
    children,
    size = 30,
    bottom = 10,
    right = 10,
    ...props
}) {
    const AbsButtonBase = () => (
        <Button variant="outlined" sx={{
            backgroundColor: 'white',
            position: 'absolute',
            bottom: `${bottom}px`,
            right: `${right}px`,
            borderRadius: '50%',
            width: `${size}px`,
            minWidth: `${size}px`,
            height: `${size}px`,
            minHeight: `${size}px`,
            boxShadow: '2px 2px 6px 0px rgba(70, 70, 70, 0.1)',
            '&:hover': {
                backgroundColor: 'white',
            },
            '& svg': {
                height: `${size * .5}px`,
                width: `${size * .5}px`
            }
        }} {...props}>
            {children}
        </Button>
    )
    return (
        tooltip ?
            <Tooltip>
                <AbsButtonBase />
            </Tooltip>
            :
            <AbsButtonBase />
    )
}