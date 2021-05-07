import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { useDispatch } from "react-redux";
import { filterResult, resetResult } from "../../../../redux/slices/CardResultSlice";

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: "30px",
        "& .MuiInputBase-input": {
            color: "#999",
        },
        "& .MuiFormLabel-root": {
            color: "#999",
        },
        "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
            transform: "translate(20px, 20px) scale(1);",
        },
        "& label.Mui-focused": {
            color: "#999",
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "#999",
            },
            "&:hover fieldset": {
                borderColor: "#999",
            },
            "&.Mui-focused fieldset": {
                borderColor: "#999",
            },
        },
    },
}));

export default function CardSearch() {
    const dispatch = useDispatch();
    const classes = useStyles();
    return (
        <TextField
            id="search"
            onChange={(event) => {
                const value = event.target.value.trim();
                dispatch(value !== "" ? filterResult(value) : resetResult());
            }}
            classes={classes}
            fullWidth
            label="Find a card"
            variant="outlined"
            autoFocus
        />
    );
}
