const redux=require('redux')

const employees=[
        {
            empId:1,
            empName:"Harshada Kutre",
            empLocation:"Goa",
        },
        {
            empId:2,
            empName:"Teju Kutre",
            empLocation:"Belgaum",
        },
        {
            empId:3,
            empName:"Shrihari Kutre",
            empLocation:"Belgaum",
        },
        {
            empId:4,
            empName:"Prem Udande",
            empLocation:"Maharashtra",
        },
        {
            empId:15,
            empName:"Vaishnavi Ghatge",
            empLocation:"Banglore",
        },
    ]

function employeeReducer(state=employees,action){
    switch(action.type){
        case 'add':
            state=[
                ...state,
                action.payload
            ]
            return state;
        case 'delete':
            console.log(action.payload)
            return state.filter(item => action.payload !== item.empId)
        default:
            return state;
    }
}

const empStore = redux.createStore(employeeReducer);
export default empStore;