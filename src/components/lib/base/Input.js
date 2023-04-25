import {InputAdornment, TextField, useTheme} from "@mui/material";

export default function Input({
                                  value,
                                  onChange,
                                  color = "primary",
                                  startIcon,
                                  endIcon,
                                  readOnly,
                                  sx,
                                  monospace,
                                  ...props
                              }) {

    const theme = useTheme()

    return (
        <TextField
            variant={"standard"}
            fullWidth
            focused
            value={value}
            onChange={event => onChange(event.target.value)}
            autoComplete={"off"}
            InputProps={{
                readOnly: readOnly ?? false,
                disableUnderline: true,
                startAdornment: startIcon ?
                    <InputAdornment position={"start"}>
                        {startIcon}
                    </InputAdornment>
                    :
                    null,
                endAdornment: endIcon ?
                    <InputAdornment position={"end"}>
                        {endIcon}
                    </InputAdornment>
                    :
                    null
            }}
            sx={{
                borderBottom: '1px solid ' + theme.palette[color].light,
                '& input': {
                    padding: '0 6px',
                    color: theme.palette[color].main,
                    fontSize: '14px',
                    ...(monospace && {
                        fontFamily: "YaHeiConsolas, monospace"
                    }),
                },
                '& :hover>.MuiInputAdornment-root': {
                    opacity: 1
                },
                '& .MuiInputAdornment-root': {
                    opacity: 0,
                    transition: 'opacity .2s ease-in-out',
                },
                ...sx
            }}
            {...props}
        />
    )
}