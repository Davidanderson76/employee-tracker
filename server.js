// Dependencies //

//Setting inquirer as { prompt } so whenever a prompt is given it will fire up inquirer //

const { prompt } = require("inquirer");
const db = require("./db");


// Loading prompts for user to select from//

async function mainPrompts() {
    const { choice } = await prompt([
        {
            type: "list",
            name: "choice",
            message: "Select your option!",
            choices: [
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "View All Employees By Department",
                    value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
                },
                {
                    name: "View All Employees By Manager",
                    value: "VIEW_EMPLOYEES_BY_MANAGER"
                },
                {
                    name: "Add Employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Remove Employee",
                    value: "REMOVE_EMPLOYEE"
                },
                {
                    name: "Update Employee Role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                {
                    name: "Update Employee Manager",
                    value: "UPDATE_EMPLOYEE_MANAGER"
                },
                {
                    name: "View All Roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "Add Role",
                    value: "ADD_ROLE"
                },
                {
                    name: "Remove Role",
                    value: "REMOVE_ROLE"
                },
                {
                    name: "View All Departments",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "Add Department",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name: "Remove Department",
                    value: "REMOVE_DEPARTMENT"
                },
                {
                    name: "Exit",
                    value: "EXIT"
                }
            ]
        }
    ]);

    //Switch statement that calls whatever function that corresponds with what the user selects//

    switch (choice) {
        case "VIEW_EMPLOYEES":
            return viewEmployees();
        case "VIEW_EMPLOYEES_BY_DEPARTMENT":
            return viewEmployeesByDepartment();
        case "VIEW_EMPLOYEES_BY_MANAGER":
            return viewEmployeesByManager();
        case "ADD_EMPLOYEE":
            return addEmployee();
        case "REMOVE_EMPLOYEE":
            return removeEmployee();
        case "UPDATE_EMPLOYEE_ROLE":
            return updateEmployeeRole();
        case "VIEW_ROLES":
            return viewRoles();
        case "ADD_ROLE":
            return addRole();
        case "REMOVE_ROLE":
            return removeRole();
        case "VIEW_DEPARTMENTS":
            return viewDepartments();
        case "ADD_DEPARTMENT":
            return addDepartment();
        case "REMOVE_DEPARTMENT":
            return removeDepartment();
        case "REMOVE_ROLE":
            return removeRole();
        default:
            return exit();
    }
}

// Function if view employees is selected //
async function viewEmployees() {
    const employees = await db.findAllEmployees();

    console.log( "\n" );
    console.table(employees);

    mainPrompts();
}

// Function if view employees by department is selected //
async function viewEmployeesByDepartment() {
    const departments = await db.findAllDepartments();
    const departmentChoices = departments.map(({ id, name }) => ({
        name: name, 
        value: id 
    }));

    const { departmentId } = await prompt([
        {
            type: "list",
            name: "departmentId",
            message: "Which department would you like to see?",
            choices: departmentChoices
        }
    ]);

    const employees = await db.findAllEmployeesByDepartment(departmentId);
    console.log( "\n" );
    console.table(employees);

    mainPrompts();
}

async function viewEmployeesByManager() {
    const managers = await db.findAllEmployees();
    const managerChoices = managers.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name }`,
        value: id
    }));

    const { managerId } = await prompt([
        {
            type: "list",
            name: "managerId",
            message: "Which employee did you want to get reports for?",
            choices: managerChoices
        }
    ]);

    const employees = await db.findAllEmployeesByManager(managerId);
    console.log( "\n" );

    if ( employees.length === 0 ) {
        console.log("This employee has no reports on file!");
    } else {
        console.table(employees);
    }

    mainPrompts();
}

async function removeEmployee() {
    const employees = await db.findAllEmployees();
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${ first_name } ${ last_name }`,
        value: id
    }));

    const { employeeId } = await prompt([
        {
            type: "list",
            name: "employeeId",
            message: "Which employee would you like to remove?",
            choices: employeeChoices
        }
    ]);

    await db.removeEmployee(employeeId);
    console.log("Removed employee from our database.");

    mainPrompts();
}

