import * as React from "react";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

export default function Index() {
  const [todoText, setTodoText] = useState("");
  const [todo, setTodo] = useState([
      {
          todoContent:'this is a todo content',
          todoDate: '10:30 pm | 21 Dec 2021'
      }
  ]);
  const changeTodoText = (e) => {
    setTodoText(e.target.value);
  };

  const addTodo = () => {
    const todoObject = { todoContent: todoText, todoDate: Date.now() };
    // data.push(...data, todoObject);
    setTodo(...todo, todoObject);
    localStorage.setItem("todo", JSON.stringify(todo));
  };

  return (
    <>
      <form>
        <TextField
          id="outlined-basic"
          sx={{ minWidth: 700 }}
          label="Enter your todo here"
          variant="outlined"
          value={todoText}
          onChange={changeTodoText}
        />
        <Fab
          color="primary"
          aria-label="add"
          size="small"
          sx={{ margin: "5px 10px 0px 10px" }}
          disabled={todoText ? false : true}
          onClick={addTodo}
        >
          <AddIcon />
        </Fab>
      </form>
    </>
  );
}
