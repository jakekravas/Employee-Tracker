const cTable = require("console.table");
const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "OzzyIronMan!",
    database: "employee_DB"
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`Connected as ${connection.threadId}`);
    promptUser();
});

function promptUser(){
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Add department",
                "Add role",
                "Add employee",
                "View departments",
                "View roles",
                "View employees"
            ],
            name: "action"
    }]).then(answer => {
        switch(answer.action){
            case "Add department":
                return addDepartment();
            case "Add role":
                return addRole();
            case "Add employee":
                return addEmployee();
            case "View departments":
                return viewDepartments();
            case "View roles":
                return viewRoles();
            case "View employees":
                return viewEmployees();
        };
    });
};

function addDepartment(){
    inquirer.prompt([
        {
            type: "input",
            message: "Which department type would you like to add?",
            name: "departmentType",
        }
    ]).then(answer => {
        console.log(answer.departmentType);
        connection.end();
    })
}

function viewDepartments(){
    connection.query(`SELECT * FROM departments`, (err, res) => {
        if (err) throw err;
        console.table(res);
        connection.end();
    });
};

function viewRoles(){
    connection.query(`SELECT * FROM roles`, (err, res) => {
        if (err) throw err;
        console.table(res);
        connection.end();
    });
};

function viewEmployees(){
    connection.query(`SELECT * FROM employees`, (err, res) => {
        if (err) throw err;
        console.table(res);
        connection.end();
    });
};