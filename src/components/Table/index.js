import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Tables() {
  if (localStorage.getItem("todo") === null) {
    var initialTodo = [];
  } else {
    initialTodo = JSON.parse(localStorage.getItem("todo"));
  }
  const [todoText, setTodoText] = useState("");
  const [todo, setTodo] = useState(initialTodo);
  const [editTodo, setEditTodo] = useState("");
  // open edit dailog box
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  //onChnage method of todo input
  const changeTodoText = (e) => {
    setTodoText(e.target.value);
  };

  //add todo function
  const addTodo = (todoText) => {
    const todoObject = {
      sno: Date.now(),
      todoContent: todoText,
      todoDate:
        new Date().toLocaleTimeString() +
        " | " +
        new Date().toLocaleDateString(),
    };
    setTodo([...todo, todoObject]);
    setTodoText("");
  };

  //delete todo function
  const deleteTodo = (deleteTodo) => {
    setTodo(
      todo.filter((e) => {
        return e !== deleteTodo;
      })
    );
  };

  // edit todo function
  const changeEditTodo = (e) => {
    setEditTodo(e.target.value);
  };

  const handleEditDailogOpen = (row) => {
    setEditTodo(row.todoContent);
    setOpen(true);
  };

  const handleEditDailogClose = () => {
    setOpen(false);
  };

  const handleEditBtn = (row) => {
    // console.log(row);
    const myIndex = todo.findIndex((obj) => obj.sno === row.sno);
    console.log(myIndex);
    let newArr = [...todo];
    newArr[myIndex].todoContent = editTodo;
    setTodo(newArr);
    handleEditDailogClose()
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
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
          onClick={() => addTodo(todoText)}
        >
          <AddIcon />
        </Fab>
      </form>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <TableContainer component={Paper} sx={{ maxWidth: 750 }}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Todo</StyledTableCell>
                <StyledTableCell align="right">Date</StyledTableCell>
                <StyledTableCell align="right">Edit</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todo.length === 0 ? (
                <>
                  <StyledTableCell align="left">N/A</StyledTableCell>
                  <StyledTableCell align="right">N/A</StyledTableCell>
                  <StyledTableCell align="right">N/A</StyledTableCell>
                </>
              ) : (
                todo.map((row) => (
                  <StyledTableRow key={row.sno}>
                    <StyledTableCell align="left">
                      {row.todoContent}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.todoDate}
                    </StyledTableCell>
                    <StyledTableCell align="right" sx={{ padding: 0 }}>
                      <Fab
                        size="small"
                        onClick={() => deleteTodo(row)}
                        sx={{ margin: "10px" }}
                      >
                        <DeleteIcon color="error" />
                      </Fab>
                      <Fab
                        onClick={() => handleEditDailogOpen(row)}
                        size="small"
                        sx={{ margin: "10px" }}
                      >
                        <EditIcon />
                      </Fab>

                      <Dialog
                        open={open}
                        onClose={handleEditDailogClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Use Google's location service?"}
                        </DialogTitle>
                        <DialogContent>
                          <TextField
                            fullWidth
                            label="Enter your todo here"
                            variant="outlined"
                            value={editTodo}
                            onChange={changeEditTodo}
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleEditDailogClose}>Close</Button>
                          <Button onClick={handleEditBtn}>Edit</Button>
                        </DialogActions>
                      </Dialog>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
