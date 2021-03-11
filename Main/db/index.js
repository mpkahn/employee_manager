const connection = require("./connection");

class DB {
  // Reference connection on the class
  constructor(connection) {
    this.connection = connection;
  }

  //Function to pull up all employees and join with other columns 
  findAllEmployees() {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }

  // function to find all employees except the given id
  findAllPossibleManagers(employeeId) {
    return this.connection.query(
      "SELECT id, first_name, last_name FROM employee WHERE id != ?",
      employeeId
    );
  }

  // function to create new employee
  createEmployee(employee) {
    return this.connection.query("INSERT INTO employee SET ?", employee);
  }

  // Function to use ID to remove respective employee 
  removeEmployee(employeeId) {
    return this.connection.query(
      "DELETE FROM employee WHERE id = ?",
      employeeId
    );
  }

  // Function to change employee role
  updateEmployeeRole(employeeId, roleId) {
    return this.connection.query(
      "UPDATE employee SET role_id = ? WHERE id = ?",
      [roleId, employeeId]
    );
  }

  // function to change employee manager
  updateEmployeeManager(employeeId, managerId) {
    return this.connection.query(
      "UPDATE employee SET manager_id = ? WHERE id = ?",
      [managerId, employeeId]
    );
  }

  // function to find all roles and join with department 
  findAllRoles() {
    return this.connection.query(
      "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
    );
  }

  // function to create new role
  createRole(role) {
    return this.connection.query("INSERT INTO role SET ?", role);
  }

  // function to delete role from the db
  removeRole(roleId) {
    return this.connection.query("DELETE FROM role WHERE id = ?", roleId);
  }

  // function to pull up departments & join w/ employees + roles to sum department budget
  findAllDepartments() {
    return this.connection.query(
      "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM department LEFT JOIN role ON role.department_id = department.id LEFT JOIN employee ON employee.role_id = role.id GROUP BY department.id, department.name"
    );
  }

  // function to create new department
  createDepartment(department) {
    return this.connection.query("INSERT INTO department SET ?", department);
  }

  // function to delete a department
  removeDepartment(departmentId) {
    return this.connection.query(
      "DELETE FROM department WHERE id = ?",
      departmentId
    );
  }

  // function to pull up employees in a given department and join with roles
  findAllEmployeesByDepartment(departmentId) {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
      departmentId
    );
  }

  // function to pull up employees by manager and join with departments and roles
  findAllEmployeesByManager(managerId) {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;",
      managerId
    );
  }
}

module.exports = new DB(connection);
