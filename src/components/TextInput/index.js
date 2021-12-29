import React from "react";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/lab/Alert";

function Index() {
  const [input, setInput] = useState("");
  const [preview, setPreview] = useState("");
  const [open, setOpen] = React.useState({state:false,message:""});

  const handleMessageOpen = (message) => {
    setOpen({state:true,message:message});
  };

  const handleMessageClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const button = [
    {
      button: "To UpperCase",
      color: "primary",
      function: () => {
          setInput(input.toUpperCase());
          setPreview(input.toUpperCase());
          handleMessageOpen("Change to uppercase")
        },
    },
    {
      button: "To LowerCase",
      color: "primary",
      function: () => {
        setInput(input.toLowerCase());
        setPreview(input.toLowerCase());
        handleMessageOpen("Change to lowercase")
      },
    },
    {
      button: "remove extra spaces",
      color: "primary",
      function: () => {
        const temp = input.split(/[ ]+/)
        setInput(temp.join(' '))
        setPreview(temp.join(' '))
        handleMessageOpen("Remove extra spaces")
      },
    },
    
    {
      button: "Copy",
      color: "primary",
      function: () => {
        navigator.clipboard.writeText(input)
        handleMessageOpen("Copy to clipboard")
      },
    },
    {
      button: "clear",
      color: "error",
      function: () => {
        setInput("");
        setPreview("");
        handleMessageOpen("Clear")
      },
    },
  ];
  const changeInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <>
      <Container maxWidth="md" style={{ marginTop: "10px" }}>
        <TextField
          id="outlined-multiline-static"
          placeholder="Enter your text here"
          multiline
          rows={8}
          fullWidth={true}
          onChange={changeInput}
          value={input}
        />
        {button.map((element) => {
          return (
            <Button
              style={{ margin: "10px" }}
              key={element.button}
              color={element.color}
              variant="contained"
              onClick={element.function}
              disabled={input ? false : true}
              size="small"
            >
              {element.button}
            </Button>
          );
        })}
        <h1>Preview</h1>
        <p>{preview === "" ? "Nothing to show" : preview}</p>
      </Container>
      <div>
        <Snackbar
          open={open.state}
          autoHideDuration={2000}
          onClose={handleMessageClose}
        >
          <MuiAlert severity="success" elevation={6} variant="filled">
            {open.message}
          </MuiAlert>
        </Snackbar>
      </div>
    </>
  );
}

export default Index;
