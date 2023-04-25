import {Fade} from "react-reveal"
import {Button, Typography} from "@mui/material";
import Chip from "./Chip";

export default function Block({piece, searchKeyword, stigmata}) {

    return (
        <Fade>
            <Button
                className={"Block"}
                variant={"outlined"}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    borderRadius: "1em",
                    textTransform: "none",
                    "& .Title": {
                        margin: "5px 0",
                    },
                    "& .Content": {
                        margin: "5px 0",
                    },
                    "& .Stigmata": {
                        margin: "5px 0",
                    }
                }}
            >
                <Typography
                    className={"Title"}
                    fontSize={18}
                    dangerouslySetInnerHTML={{__html: piece.highlightTitleMatch(searchKeyword)}}
                />
                <Typography
                    className={"Content"}
                    fontSize={13}
                    textAlign={"left"}
                    dangerouslySetInnerHTML={{__html: piece.highlightContentMatch(searchKeyword)}}
                />
                <div className={"Stigmata"}>
                    {
                        stigmata.map(stigma =>
                            piece.stigmata.includes(stigma.id) ?
                                <Chip
                                    name={stigma.name}
                                />
                                :
                                null
                        )
                    }
                </div>
            </Button>
        </Fade>
    )
}