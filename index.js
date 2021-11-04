// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const connection = require('./db/connection');
require('console.table');


// TODO: Create an array of questions for user input
const questions = () => {
    return inquirer.prompt([
    {
        type: 'list',
        message: 'Would you like to do?',
        name: 'option',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employees Role'],
    },
]);
};

const runfunction = () => questions().then(answers => {
    console.log(answers)
    let option = answers.option;
    switch (option) {
        case "View All Departments":
            viewDepartments();
            break;
        case "View All Roles":
            viewRoles();
            break;
        case "View All Employees":
            viewEmployees();
            break;
        case "Add A Department":
            addDepartment();
            break;
        case "Add A Role":
            addRole();
            break;
        case "Add An Employee":
            addEmployee();
            break;
        case "Update An Employees Role":
            updateEmployee();
            break;
        default:
            process.exit();
    }
});

// View all Departments
const viewDepartments = () =>{
    connection.query(`SELECT * FROM departments`, (err, data)=>{
        if(err){
            throw err
        } else {
            console.table(data)
        }
        runfunction();
    })
}

// View all Employees
const viewEmployees = () =>{
    connection.query(`SELECT * FROM employees`, (err, data)=>{
        if(err){
            throw err
        } else {
            console.table(data)
        }
        runfunction();
    })
}

// View all Roles
const viewRoles = () =>{
    connection.query(`SELECT * FROM roles`, (err, data)=>{
        if(err){
            throw err
        } else {
            console.table(data)
        }
        runfunction();
    })
}

const addEmployee = () => {

    inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "first_name"
        },
        {
            type: "input",
            message: "What is the employee's last name?",
            name: "last_name"
        },
        {
            type: "list",
            message: "What is the employee's role Id?",
            name: "addEmployeeRole",
            choices: [1, 2, 3]
        },
        {
            type: "list",
            message: "What is the employee's manager Id?",
            name: "addEmployeeManagerId",
            choices: [1, 2]
        }
])
.then((answers) => {
    connection.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES (?,?,?,?)`, [answers.first_name, answers.last_name, answers.addEmployeeRole, answers.addEmployeeManagerId])
    viewEmployees();
})
}


const addDepartment = () => {

    inquirer.prompt([
        {
            type: "input",
            message: "Please add a department",
            name: "newDepartment"
        },
])
.then((answers) => {
    connection.query(`INSERT INTO departments (name) VALUES (?)`, [answers.newDepartment])
    viewDepartments();
})
}


const addRole = () => {

    inquirer.prompt([
        {
            type: "input",
            message: "Please add a role title",
            name: "newRole",
        },
        {
            type: "input",
            message: "Please add a role salary",
            name: "roleSalary",
        },
        {
            type: "list",
            message: "Please add a role department",
            name: "roleDepartment",
            choices: ['1', '2']
        },
])
.then((answers) => {
    connection.query(`INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`, [answers.newRole, answers.roleSalary, answers.roleDepartment])
    viewRoles();
})
}

const updateEmployee = () => {

    inquirer.prompt([
        {
            type: "input",
            message: "Please enter employees id.",
            name: "updateEmployee",
        },
        {
            type: "input",
            message: "What is their new role?",
            name: "updateRole",
        },

])
.then((answers) => {
    connection.query(`UPDATE employees SET role_id = ? WHERE id = ?`, [answers.updateRole, answers.updateEmployee])
    viewEmployees();
})
}

runfunction();