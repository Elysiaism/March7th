import {Box, Button, Tab, Tabs, Typography, useTheme} from "@mui/material";
import {useState} from "react";
import {Fade, Flip} from "react-reveal"
import IconButton from "../../lib/base/IconButton";
import Logo from "../../lib/base/Logo";
import RemixIcon from "../../../static/icons/RemixIcon";
import Gallery from "../../lib/composite/Gallery";
import SearchPanel from "../../lib/composite/SearchPanel";

export default function Core({data, onClose}) {

    const theme = useTheme()

    const [appURL, _appURL] = useState("menu-all")

    const getStigma = (appURL) => {
        if (appURL.startsWith("stigma-")) {
            console.log(appURL.replace("stigma-", ""))
            return appURL.replace("stigma-", "")
        } else {
            return false
        }
    }

    const getPieces = () => {
        if (appURL === "menu-all") {
            return data.memory.pieces
        } else if (appURL === "menu-unclassified") {
            return data.memory.findPieces(null, null)
        } else if (appURL.startsWith("stigma-")) {
            return data.memory.findPieces(null, [getStigma(appURL)])
        } else {
            return null
        }
    }

    return (
        <Box sx={{
            background: 'white',
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            left: 0,
            position: 'fixed',
            top: 0,
            width: '100vw',
            '& > div:nth-of-type(2)': {
                flex: 1
            }
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
                <Box
                    className={"Content"}
                    sx={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'stretch',
                        overflow: 'hidden',
                    }}
                >
                    <Box
                        className={"Sidebar"}
                        sx={{
                            height: '100%',
                            minWidth: '220px',
                            width: '220px',
                            display: 'flex',
                            borderRight: '1px solid ' + theme.palette.primary.light,
                            boxShadow: '0px 0px 5px 0px rgb(70 70 70 / 10%)',
                            flexDirection: 'column',
                            '& button': {
                                display: 'flex',
                                flexDirection: 'row',
                                padding: '10px 16px',
                                justifyContent: 'flex-start',
                                margin: '0 0 2px 0',
                                border: '0',
                                borderRadius: '0',
                                alignItems: 'center',
                                minHeight: '50px',
                                maxHeight: '50px',
                                textTransform: 'none',
                                '& svg': {
                                    margin: '0 10px 0 0',
                                },
                                '& > div': {
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap"
                                }
                            }
                        }}
                    >
                        {
                            [
                                {key: 'menu-search', icon: <RemixIcon.Search fontSize="small"/>},
                                {key: 'menu-all', icon: <RemixIcon.ListCheck fontSize="small"/>},
                                {key: 'menu-unclassified', icon: <RemixIcon.ListIndefinite fontSize="small"/>}
                            ].map(menuButton =>
                                <Button
                                    key={menuButton.key}
                                    color={appURL === menuButton.key ? "secondary" : "primary"}
                                    onClick={() => _appURL(menuButton.key)}
                                    fullWidth
                                    sx={{
                                        background: appURL === menuButton.key ?
                                            theme.palette.secondary.light + "55 !important" :
                                            theme.palette.primary.light + "11 !important"
                                    }}
                                >
                                    {menuButton.icon}
                                    <Flip delay={200} left cascade>
                                        {menuButton.key}
                                    </Flip>
                                </Button>
                            )
                        }
                        <Tabs
                            onChange={(event, value) => _appURL("stigma-" + value)}
                            orientation={"vertical"}
                            scrollButtons={false}
                            value={getStigma(appURL)}
                            variant={"scrollable"}
                            sx={{
                                "& .MuiTabs-indicator": {display: 'none'},
                                "& .MuiTab-root.Mui-selected": {
                                    background: theme.palette.secondary.light + "22",
                                    color: theme.palette.secondary.main,
                                }
                            }}
                        >
                            {
                                data.memory.stigmata.map(stigma =>
                                    stigma.hidden ?
                                        null
                                        :
                                        <Tab
                                            value={stigma.id}
                                            key={stigma.id}
                                            icon={stigma.important ? <RemixIcon.EyeOff/> : null}
                                            label={<Flip delay={200} left cascade>{stigma.name}</Flip>}
                                        />
                                )
                            }
                        </Tabs>
                    </Box>
                    {
                        appURL === "menu-search" ?
                            <SearchPanel/>
                            :
                            null
                    }
                    {
                        getPieces() !== null ?
                            <Gallery
                                data={data}
                                pieces={getPieces()}
                            />
                            :
                            null
                    }
                </Box>
            </Fade>
        </Box>
    )
}