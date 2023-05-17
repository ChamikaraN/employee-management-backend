const employeeService = require("../services/employeeService");
const validateInput = require("../middleware/validateEmployee");
const logger = require("../utils/logger");

// Controller function for creating a new employee
exports.createEmployee = async (req, res) => {
  try {
    const employee = await employeeService.createEmployee(req.body);
    res.status(201).send(employee);
  } catch (error) {
    logger.error(error.message);
    res.status(400).send(error.message);
  }
};

// Use the validateInput middleware in the createEmployee function
exports.createEmployee = [validateInput, exports.createEmployee];

// Controller function for getting all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await employeeService.getAllEmployees();
    res.status(200).send(employees);
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error.message);
  }
};

// Controller function for updating an employee by ID
exports.updateEmployee = async (req, res) => {
  try {
    const employee = await employeeService.updateEmployee(
      req.params.id,
      req.body
    );
    res.status(200).send(employee);
  } catch (error) {
    logger.error(error.message);
    res.status(400).send(error.message);
  }
};

// Use the validateInput middleware in the updateEmployee function
exports.updateEmployee = [validateInput, exports.updateEmployee];

// Controller function for deleting an employee by ID
exports.deleteEmployee = async (req, res) => {
  try {
    await employeeService.deleteEmployee(req.params.id);
    res.status(200).send("Employee deleted successfully");
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error.message);
  }
};
