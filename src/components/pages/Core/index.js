import {Box, Typography, useTheme} from "@mui/material";
import {useState} from "react";
import {Fade, Flip} from "react-reveal"
import IconButton from "../../lib/base/IconButton";
import Logo from "../../lib/base/Logo";
import RemixIcon from "../../../static/icons/RemixIcon";

export default function Core({onClose}) {

    const theme = useTheme()

    const [appURL, _appURL] = useState("menu-all")

    return (
        <Box sx={{
            background: 'white',
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            left: 0,
            position: 'fixed',
            top: 0,
            width: '100vw'
        }}>
            <Fade>
                <Box
                    className={"Header"}
                    sx={{
                        cursor: "pointer",
                        userSelect: "none",
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                        height: '70px',
                        borderBottom: '1px solid ' + theme.palette.primary.light,
                        boxShadow: '0px 0px 11px 0px rgb(70 70 70 / 10%)',
                        padding: "0 10px 0 12px",
                        boxSizing: "border-box",
                        '& > .Left': {
                            fontSize: '17px',
                            letterSpacing: '.1em',
                            display: 'flex',
                            alignItems: 'center',
                            gap: "10px",
                            '& > .react-reveal': {
                                height: '43px',
                                width: '43px',
                            },
                            '& > div:nth-of-type(2)': {
                                fontFamily: 'DINosaur',
                                letterSpacing: '1px',
                                fontWeight: 100,
                                transform: 'rotateX(180deg)rotateY(180deg)'
                            }
                        },
                        '& > .Right button': {
                            margin: '0 2px'
                        }
                    }}
                >
                    <Typography className="Left" component='div' color="primary" onClick={onClose}>
                        <Fade delay={200}>
                            <Logo/>
                        </Fade>
                        <div>
                            <Flip delay={200} left cascade>
                                MARCH 7TH
                            </Flip>
                        </div>
                    </Typography>
                    <div className="Right">
                        <IconButton color="primary" Icon={RemixIcon.Download}/>
                        <IconButton color="primary" Icon={RemixIcon.Settings}/>
                    </div>
                </Box>
            </Fade>

        </Box>
    )
}