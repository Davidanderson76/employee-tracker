// Dependencies //

//Setting inquirer as { prompt } so whenever a prompt is given it will fire up inquirer //

const { prompt } = require("inquirer");
const db = require("./db");
const logo = require("asciiart-logo");
// table is required to display data in command line //
require("console.table");

init();

function init() {
    const logoText = logo({ name: "Employee Manager" }).render();
    console.log(logoText);

    mainPrompts();
}
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
                    value: "QUIT"
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
        case "UPDATE_EMPLOYEE_MANAGER":
            return updateEmployeeManager();
        default:
            return quit();
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

// Function to view all employees by Manager //

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

// Function to remove employees from database //

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

// Function to update employee roles //

async function updateEmployeeRole() {
    const employees = await db.findAllEmployees();
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${ first_name } ${ last_name }`,
        value: id
    }));

    const { employeeId } = await prompt([
        {
            type: "list",
            name: "employeeId",
            message: "Which employee's role are you updating?",
            choices: employeeChoices
        }
    ]);

    const roles = await db.findAllRoles();
    const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }));

    const { roleId } =await prompt([
        {
          type: "list",
          name: "roleId",
          message: "Which role do you want to assign to the selected employee?",
          choices: roleChoices  
        }
    ]);

    await db.updateEmployeeRole( employeeId, roleId );
    console.log("Successfully updated the employee's role!");

    mainPrompts();
}

// Function to update employee managers //

async function updateEmployeeManager() {
    const employees = await db.findAllEmployees();
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${ first_name } ${ last_name }`,
        value: id
    }));

    const { employeeId } = await prompt([
        {
            type: "list",
            name: "employeeId",
            message: "Which employee needs an updated manager on file?",
            choices: employeeChoices
        }
    ]);

    const managers = await db.findAllPossibleManagers(employeeId);
    const managerChoices = managers.map(({ id, first_name, last_name }) => ({
        name: `${ first_name } ${ last_name }`,
        value: id 
    }));

    const { managerId } = await prompt([
        {
            type: "list",
            name: "managerId",
            message: "Which employee do you want to select as the manager for the selected employee?",
            choices: managerChoices
        }
    ]);

    await db.updateEmployeeManager( employeeId, managerId );
    console.log("Successfully updated the employee's manager!");

    mainPrompts();
}

// Function to view all roles //
async function viewRoles() {
    const roles = await db.findAllRoles();
    console.log( "\n" );
    console.table(roles);

    mainPrompts();
}

// Function to add roles to employees //
async function addRole() {
    const departments = await db.findAllDepartments();
    const departmentChoices = departments.map(({ id, name }) => ({
        namem: name,
        value: id
    }));

    const role = await prompt([
        {
            name: "title",
            message: "What is the name of the role?"
        },
        {
            name: "salary",
            message: "What is the saary of the specified role?"
        },
        {
            type: "list",
            name: "department_id",
            message: "Which department does this role belong to?",
            choices: departmentChoices
        }
    ]);

    await db.createRole(role);
    console.log(`Added ${ role.title } to the database!`);

    mainPrompts();
}

// Function to remove roles and employees associated with that role //

async function removeRole() {
    const roles = await db.findAllRoles();
    const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }));

    const { roleId } = await prompt([
        {
            type: "list",
            name: "roleId",
            message: "What role did you want to remove??",
            choices: roleChoices
        }
    ]);

    await db.removeRole(roleId);
    console.log("Successfully emoved role from database!");

    mainPrompts();
}

// Function to view all departments //

async function viewDepartments() {
    const departments = await db.findAllDepartments();
    console.log( "\n" );
    console.table(departments);

    mainPrompts();
}

// Function to add departments //

async function addDepartment() {
    const department = await prompt([
        {
            name: "name",
            message: "What is the name of the department you would like to add?",
        }
    ]);

    await db.createDepartment(department);
    console.log( `Successfully added ${department.name} to the database!`);

    mainPrompts();
}

// Function to remove departments //

async function removeDepartment() {
    const departments = await db.findAllDepartments();
    const departmentChoices = departments.map(({ id, name }) => ({
        name:name,
        value: id
    }));

    const { departmentId } = await prompt({
        type: "list",
        name: "departmentId",
        message: "Which department would you like to remove?",
        choices: departmentChoices
    });

    await db.removeDepartment(departmentId);
    console.log(`Successfully removed from the database!`);

    mainPrompts();
}

// Function to add an employee //

async function addEmployee() {
    const roles = await db.findAllRoles();
    const employees = await db.findAllEmployees();
    const employee = await prompt([
        {
            name: "first_name",
            message: "Enter the employee's first name?"
        },
        {
            name: "last_name",
            message: "Enter the employee's last name"
        }
    ]);

    const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }));

    const { roleId } =await prompt({
        type: "list",
        name: "roleId",
        message: "Select the employee's role",
        choices: roleChoices
    });

    employee.role_id = roleId;
    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));
    managerChoices.unshift({ name: "None", value: null });
    const { managerId } = await prompt({
        type: "list",
        name: "managerId",
        message: "Who will be the selected employee's manager?",
        choices: managerChoices
    });

    employee.manager_id = managerId;
    await db.createEmployee(employee);

    console.log(`Successfully added ${ employee.first_name } ${ employee.last_name } to the database!`);

    mainPrompts();
}

// function to exit program //

function quit() {
    console.log("See you next time!");
    process.exit();
}
