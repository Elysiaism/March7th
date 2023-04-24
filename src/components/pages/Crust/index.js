import {Box, Typography, useTheme} from "@mui/material";
import {useEffect, useState} from "react";
import Logo from "../../lib/base/Logo";
import {Fade, Flip} from "react-reveal";
import Input from "../../lib/base/Input";
import IconButton from "../../lib/base/IconButton";
import RemixIcon from "../../../static/icons/RemixIcon";

export default function Crust({data, notification, onClose}) {

    const theme = useTheme()

    const [fileName, _fileName] = useState("")
    const [fileContent, _fileContent] = useState("")
    const [unlockTimer, _unlockTimer] = useState(null)
    const [isPasswordVisible, _isPasswordVisible] = useState(false)

    const onFileDrop = event => {
        event.preventDefault()
        event.stopPropagation()
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            loadFile(event.dataTransfer.files[0])
        }
    }

    const onFileUpload = event => {
        loadFile(event.target.files[0])
    }

    const onFileUnload = event => {
        event.preventDefault()
        event.stopPropagation()
        _fileName("")
        _fileContent("")
        data._credential("")
    }

    const loadFile = file => {
        if (file.name.endsWith(".m7")) {
            // core.upload(file, _fileContent)
            _fileName(file.name.replace(".m7", ""))
        } else {
            notification.on(2, "msg-invalid_file_upload", 3000)
        }
    }

    const unlockFile = () => {
        notification.on(4, "msg-unlocking")
        data.memory.interpret(
            fileContent,
            data.credential,
            memory => {
                data._memory(memory)
                notification.on(1, "msg-file_unlock_succeed", 3000)
                setTimeout(() => {
                    onClose()
                }, 3000);
            },
            error => {
                notification.on(3, "msg-file_unlock_fail", 3000)
                console.error(error)
            })
    }

    const onPasswordChange = value => {
        data._credential(value)
        if (unlockTimer) clearTimeout(unlockTimer)
        _unlockTimer(setTimeout(() => {
            if (value.length > 0) unlockFile()
        }, 2000))
    }

    useEffect(() => {
        return () => {
            if (unlockTimer) clearTimeout(unlockTimer)
        }
    }, [unlockTimer])

    return (
        <Box
            className={"Crust"}
            onDragOver={onFileDrop}
            onDrop={onFileDrop}
            sx={{
                alignItems: 'center',
                background: 'white',
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                justifyContent: 'center',
                left: 0,
                position: 'fixed',
                top: 0,
                width: '100vw'
            }}
        >
            <Typography
                className={"Title"}
                color={"primary"}
                sx={{
                    cursor: "pointer",
                    userSelect: "none",
                    fontFamily: "DINosaur",
                    display: 'flex',
                    height: '70px',
                    justifyContent: 'space-between',
                    position: 'absolute',
                    top: '30vh',
                    width: '200px',
                    marginLeft: '-20px',
                    "& svg.Logo": {
                        height: "66px"
                    },
                    '& div.Logo': {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        lineHeight: '33px',
                        fontSize: '20px',
                        fontWeight: "100",
                        letterSpacing: '8px',
                        marginRight: '-8px',
                    }
                }}
            >
                <Fade>
                    <Logo/>
                </Fade>
                <div className={"Logo"}>
                    <Flip left cascade>MARCH</Flip>
                    <Flip left cascade>7TH</Flip>
                </div>
            </Typography>
            <Box
                className={"Content"}
                sx={{
                    top: 'calc(30vh + 100px)',
                    position: 'absolute',
                    width: '160px',
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px"
                }}
            >
                <Fade delay={300}>
                    <Input
                        value={fileName}
                        onChange={_fileName}
                        color={"primary"}
                        readOnly
                        endIcon={
                            fileName === "" ?
                                <IconButton component={"label"} Icon={RemixIcon.Upload}>
                                    <input accept='.m7' type="file" onChange={onFileUpload} hidden/>
                                </IconButton>
                                :
                                <IconButton Icon={RemixIcon.Close} onClick={onFileUnload}/>
                        }
                    />
                </Fade>
                {
                    fileName === "" ?
                        <Fade delay={300}>
                            <Typography
                                fontSize={10}
                                color='secondary'
                                onClick={onClose}
                                sx={{
                                    cursor: "pointer",
                                    userSelect: "none",
                                }}
                            >
                                {"button-create_new_vault"}
                            </Typography>
                        </Fade>
                        :
                        <Fade>
                            <Input
                                value={data.credential}
                                onChange={onPasswordChange}
                                type={isPasswordVisible ? "text" : "password"}
                                color={"primary"}
                                monospace
                                endIcon={
                                    isPasswordVisible ?
                                        <IconButton Icon={RemixIcon.Eye} onClick={() => _isPasswordVisible(false)}/>
                                        :
                                        <IconButton Icon={RemixIcon.EyeOff} onClick={() => _isPasswordVisible(true)}/>
                                }
                            />
                        </Fade>
                }
            </Box>
        </Box>
    )
}