import {Fade} from "react-reveal"
import Paper from "./Paper";
import {Button, Typography} from "@mui/material";
import RemixIcon from "../../../static/icons/RemixIcon";

export default function CreateNewButton({onClick}) {
    return (
        <Fade>
            <Paper
                border
                padding={"0"}
                color={"secondary"}
                bgColor={["secondary", "11"]}
            >
                <Button
                    fullWidth
                    color={"secondary"}
                    startIcon={<RemixIcon.FileAdd/>}
                    onClick={onClick}
                >
                    <Typography textTransform={'none'} fontSize={14}>
                        {"button-create_new_note"}
                    </Typography>
                </Button>
            </Paper>
        </Fade>
    )
}