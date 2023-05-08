import { useState } from 'react';
import Memory from '../model/Memory';
import { createTheme, ThemeProvider } from '@mui/material';
import Loading from './lib/base/Loading';
import Crust from "./pages/Crust";
import Core from "./pages/Core";
import Notification from "./lib/base/Notification";
import AbsButton from "./lib/base/AbsButton";
import Fonts from "./lib/base/Fonts";
import RemixIcon from "../static/icons/RemixIcon";
import { blue, grey } from "@mui/material/colors";

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

    const [memory, _memory] = useState(new Memory({
        pieces: Array.from(Array(5).keys()).map(() =>
        ({
            title: "Lorem Ipsum",
            content: "<div>Aliquam in metus nec nisl commodo tempor. Nam posuere vel sapien sit amet vulputate. Nulla convallis sollicitudin nibh non fermentum. Pellentesque in mattis libero. Fusce a ipsum nec ipsum cursus commodo non at purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam ornare turpis ut neque pretium sodales.</div>",
            stigmata: ["nbku82j3rkee"]
        })).concat(
            Array.from(Array(5).keys()).map(() =>
            ({
                title: "Ipsum Lorem",
                content: "<div>Aliquam in metus nec nisl commodo tempor. Nam posuere vel sapien sit amet vulputate. Nulla convallis sollicitudin nibh non fermentum. Pellentesque in mattis libero. Fusce a ipsum nec ipsum cursus commodo non at purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam ornare turpis ut neque pretium sodales.</div>",
                stigmata: ["asdf98wu8ief"]
            }))
        ).concat(
            Array.from(Array(5).keys()).map(() =>
            ({
                title: "Lorem",
                content: "<div>Aliquam in metus nec nisl commodo tempor. Nam posuere vel sapien sit amet vulputate. Nulla convallis sollicitudin nibh non fermentum. Pellentesque in mattis libero. Fusce a ipsum nec ipsum cursus commodo non at purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam ornare turpis ut neque pretium sodales.</div>",
                stigmata: ["3456789fiuhjds"]
            }))
        ).concat(
            Array.from(Array(5).keys()).map(() =>
            ({
                title: "Ipsum",
                content: "<div>Aliquam in metus nec nisl commodo tempor. Nam posuere vel sapien sit amet vulputate. Nulla convallis sollicitudin nibh non fermentum. Pellentesque in mattis libero. Fusce a ipsum nec ipsum cursus commodo non at purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam ornare turpis ut neque pretium sodales.</div>",
                stigmata: []
            }))
        ),
        stigmata: [
            { id: "3456789fiuhjds", name: 'Company', hidden: false },
            { id: "asdf98wu8ief", name: 'Family', hidden: true },
            { id: "nbku82j3rkee", name: 'Personal', hidden: false }
        ]
    }))
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
        _message(message => ({ ...message, open: false }))
    }
    

    return (
        <ThemeProvider theme={theme}>
            <FontLoader fonts={["DINosaur", "HarmonyOS", "YaHeiConsolas"]} onLoadComplete={() => _isFontLoaded(true)} />
            {!isFontLoaded ? <Loading /> : null}
            {isFontLoaded && isLocked ? <DataDecryptionPortal /> : null}
            {isFontLoaded && !isLocked ? <UserInteractionPortal /> : null}
            <Notifier value={message} />
        </ThemeProvider>
    )
}