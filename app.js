const cTable = require("console.table");
const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "OzzyIronMan!",
    database: "employee_DB_"
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
                "View departments",
                "View roles",
                "View employees",
                "Add department",
                "Add role",
                "Add employee (manager)",
                "Add employee (non-manager)",
                "Update employee role",
                "Exit"
            ],
            name: "action"
    }]).then(answer => {
        switch(answer.action){
            case "View departments":
                return viewDepartments();
            case "View roles":
                return viewRoles();
            case "View employees":
                return viewEmployees();
            case "Add department":
                return addDepartment();
            case "Add role":
                return addRole();
            case "Add employee (manager)":
                return addManagerEmployee();
            case "Add employee (non-manager)":
                return addNonManagerEmployee();
            case "Update employee role":
                return updateEmployeeRole();
            case "Exit":
                return connection.end();
        };
    });
};

function viewDepartments(){
    connection.query("SELECT * FROM departments", (err, res) => {
        if (err) throw err;
        console.log("\n");
        console.table(res);
        console.log("\n");
        promptUser();
    });
};

function viewEmployees(){
    connection.query("SELECT id, first_name, last_name, title, department, salary FROM employees LEFT JOIN roles ON employees.role_fk = roles.role_pk LEFT JOIN departments ON roles.dpt_fk = departments.dpt_pk;", (err, result) => {
        if (err) throw err;
        console.log("\n");
        console.table(result);
        console.log("\n");
        promptUser();
    });
};

function viewRoles(){
    connection.query("SELECT role_pk, title, salary, department FROM roles LEFT JOIN departments ON departments.dpt_pk = roles.dpt_fk", (err, result) => {
        if (err) throw err;
        console.log("\n");
        console.table(result);
        console.log("\n");
        promptUser();
    });
};

function addDepartment(){
    console.log("\n");
    inquirer.prompt([
        {
            type: "input",
            message: "Name of department: ",
            name: "departmentName",
        }
    ]).then(answer => {
        connection.query("INSERT INTO departments(department) VALUES (?)", [answer.departmentName], (err, res) => {
            if (err) throw err;
        });
        console.log("\n");
        promptUser();
    });
};

function addRole(){
    console.log("\n");
    let departmentNames = [];
    let departmentIDs = [];
    connection.query("SELECT * FROM departments", (err, result) => {
        for (let i = 0; i < result.length; i++) {
            departmentNames.push(result[i].department);
            departmentIDs.push(result[i].dpt_pk);
        }
        inquirer.prompt([
            {
                type: "list",
                message: "Select department for role",
                choices: departmentNames,
                name: "department_name"
            },
            {
                type: "input",
                message: "Title: ",
                name: "title"
            },
            {
                type: "number",
                message: "Salary: ",
                name: "salary"
            }
        ]).then(answers => {
            let departmentID = null;
            for (let i = 0; i < result.length; i++){
                if (answers.department_name === result[i].department){
                    departmentID = result[i].dpt_pk;
                }
            }
            connection.query("INSERT INTO roles(title, salary, dpt_fk) VALUES (?, ?, ?)", [answers.title, answers.salary, departmentID], (err, result) => {
                    if (err) throw err;
                });
                console.log("\n");
                promptUser();
        });
    })
};

function addManagerEmployee(){
    let roleNames = [];
    connection.query("SELECT * FROM roles", (err, result) => {
        if (err) throw err;
        for (let i = 0; i < result.length; i++){
            if (result[i].title.includes("Manager")){
                roleNames.push(result[i].title)
            }
        }
        inquirer.prompt([
            {
                type: "input",
                message: "First Name: ",
                name: "firstName"
            },
            {
                type: "input",
                message: "Last Name: ",
                name: "lastName"
            },
            {
                type: "list",
                message: "Role: ",
                choices: roleNames,
                name: "role"
            }
        ]).then(answers => {
            let roleID = null;
            for (let i = 0; i < result.length; i++){
                if (answers.role === result[i].title) {
                    roleID = result[i].role_pk;
                }
            }
            connection.query("INSERT INTO employees (first_name, last_name, role_fk) VALUES (?, ?, ?)", [answers.firstName, answers.lastName, roleID], (err, result) => {
                if (err) throw err;
                promptUser();
            })
        })
    })
}

function addNonManagerEmployee(){
    let managerID = null;
    let roleID = null;
    let managerNames = [];
    let managerNamesWithIDs = [];
    let nonManagerRoles = [];
    let nonManagerRolesWithIDs = [];
    connection.query("SELECT * FROM employees WHERE manager_id IS NULL", (err, result) => {
        if (err) throw err;
        for (let i = 0; i < result.length; i++){
            managerNames.push(`${result[i].first_name} ${result[i].last_name}`);
            managerNamesWithIDs.push({
                ManagerObjName: `${result[i].first_name} ${result[i].last_name}`,
                ManagerObjID: result[i].id
            });
        }
    })
    connection.query("SELECT * FROM roles", (err, result) => {
        if (err) throw err;
        for (let i = 0; i < result.length; i++){
            if (result[i].title.includes("Manager") === false){
                nonManagerRoles.push(result[i].title);
                nonManagerRolesWithIDs.push({
                    objRoleTitle: result[i].title,
                    objRoleID: result[i].role_pk
                })
            }
        }
        inquirer.prompt([
            {
                type: "input",
                message: "First Name: ",
                name: "firstName"
            },
            {
                type: "input",
                message: "Last Name: ",
                name: "lastName"
            },
            {
                type: "list",
                message: "Role: ",
                choices: nonManagerRoles,
                name: "role"
            },
            {
                type: "list",
                message: "Manager: ",
                choices: managerNames,
                name: "managerOfEmployee"
            }
        ]).then(answers => {
            for (let i = 0; i < managerNamesWithIDs.length; i++){
                if (managerNamesWithIDs[i].ManagerObjName === answers.managerOfEmployee){
                    managerID = managerNamesWithIDs[i].ManagerObjID;
                }
            }

            for (let i = 0; i < nonManagerRolesWithIDs.length; i++){
                if (nonManagerRolesWithIDs[i].objRoleTitle === answers.role){
                    roleID = nonManagerRolesWithIDs[i].objRoleID;
                }
            }

            connection.query("INSERT INTO employees (first_name, last_name, role_fk, manager_id) VALUES (?, ?, ?, ?)", [answers.firstName, answers.lastName, roleID, managerID], (err, result) => {
                if (err) throw err;
                promptUser();
            })
        })
    })
}

function updateEmployeeRole(){
    let employeeNames = [];
    let roleTitles = [];
    let roleTitlesAndIDs = [];
    let newRoleID = null;
    connection.query("SELECT * FROM employees", (err, result) => {
        if (err) throw err;
        for (let i = 0; i < result.length; i++){
            let fullName = `${result[i].first_name} ${result[i].last_name}`;
            employeeNames.push(fullName);
        }
    });
    connection.query("SELECT * FROM roles", (err, result) => {
        if (err) throw err;
        for (let i = 0; i < result.length; i++){
            roleTitles.push(result[i].title);
            roleTitlesAndIDs.push({
                title: result[i].title,
                id: result[i].role_pk
            })
        }
        inquirer.prompt([
            {
                type: "list",
                message: "Which employees role would you like to update?",
                choices: employeeNames,
                name: "employeeToUpdate"
            },
            {
                type: "list",
                message: "New role: ",
                choices: roleTitles,
                name: "newRole"
            }
        ]).then(answers=> {
            let firstName = (answers.employeeToUpdate).split(" ")[0];
            let lastName = (answers.employeeToUpdate).split(" ")[1];
            for (let i = 0; i < roleTitlesAndIDs.length; i++){
                if (answers.newRole === roleTitlesAndIDs[i].title){
                    newRoleID = roleTitlesAndIDs[i].id;
                }
            }
            connection.query("UPDATE employees SET role_fk = ? WHERE first_name = ? AND last_name = ?", [newRoleID, firstName, lastName], (err, result) => {
                if (err) throw err;
                promptUser();
            })
        })
    })
}