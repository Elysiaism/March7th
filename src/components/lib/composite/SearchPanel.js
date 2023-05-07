import {Accordion, AccordionDetails, AccordionSummary, Box} from "@mui/material";
import Input from "../base/Input";
import RemixIcon from "../../../static/icons/RemixIcon";
import {useState} from "react";

export default function SearchPanel({data}) {

    const [isPanelExpanded,_isPanelExpanded]=useState(false)


    return (
        <Box sx={{
            width: "100%"
        }}>
            <Box>
                <Input endIcon={<RemixIcon.FileAdd/>}/>
                <Accordion
                    expanded={isPanelExpanded}
                    disableGutters
                    elevation={0}
                    sx={{
                        margin: 0,
                        '&:before': {
                            display: 'none',
                        },
                        '& .MuiAccordionSummary-content': {
                            margin: 0
                        }
                    }}
                >
                    <AccordionSummary  sx={{
                        margin: 0,
                        padding: 0,
                    }}>

                    </AccordionSummary>
                    <AccordionDetails>

                    </AccordionDetails>
                </Accordion>
            </Box>

        </Box>
    )
}