const connection = require("./connection");

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    //function to find all employees and join with departments //
    // displays role, salary, department, and maager //

    findAllEmployees() {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );
    }
    // list all managers //
    allManagers(employeeId) {
        return this.connection.query(
            "SELECT id, first_name, last_name, FROM employee WHERE id != ?",
            employeeId
        );
    }

    // creating new employee //
    createEmployee(employee) {
        return this.connection.query("INSERT INTO employee SET ?", employee);
    }

    // finding employees by manager //
    findAllEmployeesByManager(managerId) {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;",
            managerId
        );
    }
    // find employees in a specified department //
    findAllEMployeesByDepartment(departmentId) {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
            departmentId
        );
    }
    // remove a department
    removeDepartment(departmentId) {
        return this.connection.query(
            "DELETE FROM department WHERE id = ?",
            departmentId
        );
    }
    // create a new department //
    createDepartment(department) {
        return this.connection.query(
            "INSERT INTO department SET ?", department);
    }
    // find departments and join with employees and roles // 
    //sums up budget //
    findAllDepartments() {
        return this.connection.query(
            "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;"
        );
    }
    // Removes roles //
    removeRole(roleId) {
        return this.connection.query("DELETE FROM role WHERE id = ?", roleId);
    }
    // creates new role //
    createRole(role) {
        return this.connection.query("INSERT INTO role SET ?", role);
    }
    // finds all roles //
    // joins with departments //
    findAllRoles() {
        return this.connection.query(
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
        );
    }
    // update employees manager //
    updateEmployeeManager( employeeId, managerId ) {
        return this.connection.query(
            "UPDATE employee SET manager_id = ? WHERE id = ?",
            [ roleId, employeeid ]
        );
    }
    // Update employees role //
    updateEmployeeRole( employeeId, roleId ) {
        return this.connection.query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [ roleId, employeeId ]
        );
    }
    // remove employee with id
    removeEmployee( employeeId ) {
        return this.connection.query(
            "DELETE FROM employee WHERE id = ?",
            employeeId
        );
    }
}

module.eports = new DB(connection);