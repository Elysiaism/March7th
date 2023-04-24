import {useState} from 'react';
import Memory from '../model/Memory';
import {createTheme, ThemeProvider} from '@mui/material';
import Loading from './lib/base/Loading';
import Crust from "./pages/Crust";
import Core from "./pages/Core";
import Notification from "./lib/base/Notification";
import AbsButton from "./lib/base/AbsButton";
import Fonts from "./lib/base/Fonts";
import RemixIcon from "../static/icons/RemixIcon";
import {blue, grey} from "@mui/material/colors";

export default function App() {

    const theme = createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: grey[600],
                contrastText: '#ffffff',
                light: grey[400],
                dark: grey[800],
            },
            secondary: {
                main: blue[400],
                contrastText: '#ffffff',
                light: blue[200],
                dark: blue[700],
            }
        },
        typography: {
            fontWeightLight: 400,
            fontWeightMedium: 400,
            fontWeightBold: 400,
            fontFamily: `HarmonyOS, -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"`
        }
    })

    const [memory, _memory] = useState(new Memory())
    const [credential, _credential] = useState("")
    const [message, _message] = useState({
        open: false,
        type: 0,
        text: ""
    })

    const [isFontLoaded, _isFontLoaded] = useState(false)
    const [isLocked, _isLocked] = useState(true)

    const notificationOn = (type, text, duration) => {
        _message({
            open: true,
            type: type,
            text: text
        })
        if (duration) {
            setTimeout(() => notificationOff(), duration)
        }
    }

    const notificationOff = () => {
        _message(message => ({...message, open: false}))
    }

    return (
        <ThemeProvider theme={theme}>
            <Fonts fonts={["DINosaur", "HarmonyOS", "YaHeiConsolas"]} onLoadComplete={() => _isFontLoaded(true)}/>
            {
                isFontLoaded ?
                    <>
                        {
                            isLocked ?
                                <Crust
                                    data={{memory, _memory, credential, _credential}}
                                    notification={{on: notificationOn, off: notificationOff}}
                                    onClose={() => _isLocked(false)}
                                />
                                :
                                <Core/>
                        }
                    </>
                    :
                    <Loading/>
            }
            <Notification
                open={message.open}
                type={message.type}
                text={message.text}
            />
            <AbsButton>
                <RemixIcon.Draft/>
            </AbsButton>
        </ThemeProvider>
    )
}
