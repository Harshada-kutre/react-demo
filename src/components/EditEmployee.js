import React from "react";
import { connect } from "react-redux";
import '../stylings/addEmployee.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

class Add extends React.Component{
    constructor(props){
        super(props);
        this.state={
            empId:'',
            empName:'',
            empLocation:''
        }
        console.log(props)
    }

    handleInputChange(event){
        this.setState({
            ...this.setState,
            [event.target.name]:event.target.value
        })
        console.log(this.state);
    }

    // handleSubmit(event){
    //     event.preventDefault();
    //     const newEmp=this.state
    //     var validity=true

    //     this.props.employee.map( emp => {
    //         if(parseInt(newEmp.empId) === emp.empId){
    //             return validity=false;
    //         }
    //     })

    //     if(validity === true){
    //         this.props.add(newEmp);
    //         alert("Successfully added an employee");
    //         this.props.handleClose();
    //     }
    //     else{
    //         alert("This Employee ID already exists");
    //     }
        
    // }

    render(){
        return(
            <main className="main">
            <div className="addEmp">
                <h3 className="addEmp-header">Add New Employees</h3>
                <form>
                    <TextField
                        id="outlined-controlled"
                        label="Employee ID"
                        onChange={this.handleInputChange.bind(this)}
                        type="number" 
                        name="empId"
                        required
                    /><br/><br/>
                    <TextField
                        id="outlined-controlled"
                        label="Employee Name"
                        onChange={this.handleInputChange.bind(this)}
                        type="text" 
                        name="empName"
                        required
                    /><br/><br/>
                    <TextField
                        id="outlined-controlled"
                        label="Employee Location"
                        onChange={this.handleInputChange.bind(this)}
                        type="text" 
                        name="empLocation"
                        required
                    /><br/><br/>
                        <Button type="submit" variant="contained">EDIT</Button>
                </form>
            </div>
            </main>
        )
    }
}

function mapStateToprops(state){
    return{
        employee: state
    }
}

function mapDispatchToProps(dispatch){
    return{
        add: (emp) => dispatch({type:'add', payload:emp}),
    }
}

export default connect(mapStateToprops,mapDispatchToProps)(Add);


