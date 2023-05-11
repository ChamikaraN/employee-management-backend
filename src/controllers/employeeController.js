const EmployeeService = require("../services/employeeService");
const validateInput = require("../middleware/middleware");

// Controller function for creating a new employee
exports.createEmployee = async (req, res) => {
  try {
    const employee = await EmployeeService.createEmployee(req.body);
    res.status(201).send(employee);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.createEmployee = [validateInput, exports.createEmployee];

// Controller function for getting all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await EmployeeService.getAllEmployees();
    res.status(200).send(employees);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Controller function for updating an employee by ID
exports.updateEmployee = async (req, res) => {
  try {
    const employee = await EmployeeService.updateEmployee(
      req.params.id,
      req.body
    );
    res.status(200).send(employee);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Controller function for deleting an employee by ID
exports.deleteEmployee = async (req, res) => {
  try {
    await EmployeeService.deleteEmployee(req.params.id);
    res.status(200).send("Employee deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Use the validateInput middleware in the createEmployee and updateEmployee functions
exports.updateEmployee = [validateInput, exports.updateEmployee];
