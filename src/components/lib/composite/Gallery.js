import {useState} from "react";
import Piece from "../../../model/Piece";
import Scrollbars from "react-custom-scrollbars"
import {default as ReactMasonry} from "react-masonry-css"
import {Box, Button, Typography} from "@mui/material";
import Block from "../base/Block";
import {Fade} from "react-reveal";

export default function Gallery({
                                    data,
                                    pieces,
                                    onCreate,
                                    disableCreation,
                                    defaultStigma
                                }) {

    const [isEditorOpen, _isEditorOpen] = useState(false)
    const [currentPiece, _currentPiece] = useState(new Piece())

    const createPiece = () => {
        _currentPiece(new Piece({stigmata: defaultStigma ? [defaultStigma] : []}))
        _isEditorOpen(true)
    }

    const closePiece = (piece) => {
        _isEditorOpen(false)
    }

    return (
        <Box sx={{
            width: "100%",
            '& .Masonry': {
                display: "flex",
                width: "auto",
                padding: "0 10px",
                '& .MasonryColumn': {
                    backgroundClip: 'padding-box',
                    boxSizing: "border-box",
                    "& .react-reveal": {
                        margin: "12px 6px",
                        "& .Block": {
                            borderRadius: "1em",
                        }
                    }
                }
            }
        }}>
            <Scrollbars>
                <ReactMasonry
                    className={"Masonry"}
                    columnClassName={"MasonryColumn"}
                    breakpointCols={{default: 4, 1400: 3, 1050: 2, 750: 1}}
                >
                    <Fade>
                        <Button
                            className={"Block"}
                            variant={"outlined"}
                            color={"secondary"}
                            component={"div"}
                            fullWidth
                        >
                            <Typography textTransform={'none'} fontSize={14}>
                                {"button-create_new_note"}
                            </Typography>
                        </Button>
                    </Fade>
                    {
                        pieces.map(piece =>
                            <Block piece={piece} stigmata={data.memory.stigmata}/>
                        )
                    }
                </ReactMasonry>
            </Scrollbars>
        </Box>
    )
}