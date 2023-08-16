import React from "react";
import { connect } from "react-redux";
import "../stylings/employeeDetails.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AddEmployee from "./AddEmployee";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

class Employee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      add: false,
      edit: false,
      delete: false,
    };

    this.style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
    };
  }

  handleOpen(subState) {
    this.setState({
      ...this.state,
      [subState]: true,
    });
  }

  handleClose(subState) {
    this.setState({
      ...this.state,
      [subState]: false,
    });
  }

  deleteEmployee(empid) {
    this.props.delete(empid);
    this.handleClose("delete");
  }

  render() {
    // ------------------------------------Table Styling-------------------------------------------------------------------------------

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 18,
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 18,
      },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    }));

    //--------------------------------------------------------------------------------------------------------------------------------

    return (
      <main>
        <div className="button">
          <h1 className="header">EMPLOYEE MANAGEMENT SYSTEM</h1>
          <Button
            className="addButton"
            variant="contained"
            onClick={this.handleOpen.bind(this, "add")}
          >
            ADD EMPLOYEE
          </Button>

          {/*---------------------------------------------------------Adding Employee------------------------------------------------------ */}
          {this.state.add && (
            <Modal
              open={this.state.add}
              onClose={this.handleClose.bind(this, "add")}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={this.style}>
                <AddEmployee
                  state={this.state}
                  handleClose={this.handleClose.bind(this, "add")}
                />
              </Box>
            </Modal>
          )}
          {/*--------------------------------------------------------------------------------------------------------------------------------*/}
        </div>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Employee ID</StyledTableCell>
                <StyledTableCell align="center">Employee Name</StyledTableCell>
                <StyledTableCell align="center">
                  Employee Location
                </StyledTableCell>
                <StyledTableCell align="center">
                  Delete Employee
                </StyledTableCell>
                <StyledTableCell align="center">Edit Employee</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.employee.map((emp) => (
                <StyledTableRow key={emp.empId}>
                  <StyledTableCell align="center" component="th" scope="row">
                    {emp.empId}
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    {emp.empName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {emp.empLocation}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {/* -----------------------------------------delete Employee------------------------------------------------------------------------ */}
                    <Button
                      onClick={() => {
                        this.handleOpen.bind(this, "delete");
                      }}
                      variant="contained"
                    >
                      DELETE {emp.empId}
                    </Button>

                    <Dialog
                      open={this.state.delete}
                      onClose={this.handleClose.bind(this, "delete")}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        Are you sure, you want to delete Employee
                        {emp.empName}
                      </DialogTitle>
                      <DialogActions>
                        <Button
                          onClick={this.deleteEmployee.bind(this, emp.empId)}
                        >
                          Delete
                        </Button>
                        <Button
                          onClick={this.handleClose.bind(this, "delete")}
                          autoFocus
                        >
                          Cancel
                        </Button>
                      </DialogActions>
                    </Dialog>

                    {/* ------------------------------------------------------------------------------------------------------------------------------------- */}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      onClick={this.handleOpen.bind(this, "delete")}
                      variant="contained"
                    >
                      EDIT
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    );
  }
}

function mapStateToprops(state) {
  return {
    employee: state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    delete: (empid) => dispatch({ type: "delete", payload: empid }),
  };
}

export default connect(mapStateToprops, mapDispatchToProps)(Employee);
