const Employee = require("../models/employee");
const { getPhoto } = require("../utils/getPhoto");
const { validationRules } = require("../utils/validationRules");

// Controller function for creating a new employee
exports.createEmployee = async (req, res) => {
  try {
    // validate input fields
    const errors = {};
    for (const [key, value] of Object.entries(req.body)) {
      const rule = validationRules[key];
      if (rule) {
        if (rule.required && !value) {
          errors[key] = `${key} is required`;
        } else if (value && !rule.pattern.test(value)) {
          errors[key] = rule.message;
        }
      }
    }

    // return validation errors if any
    if (Object.keys(errors).length > 0) {
      return res.status(400).send(errors);
    }

    // generate photo based on gender
    const photo = await getPhoto(req.body.gender);

    // create new employee with validated data
    const employeeData = {
      ...req.body,
      photo: photo,
    };
    const employee = new Employee(employeeData);
    await employee.save();
    res.status(201).send(employee);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Controller function for getting all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).send(employees);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Controller function for updating an employee by ID
exports.updateEmployee = async (req, res) => {
  try {
    // validate input fields
    const errors = {};
    for (const [key, value] of Object.entries(req.body)) {
      const rule = validationRules[key];
      if (rule) {
        if (rule.required && !value) {
          errors[key] = `${key} is required`;
        } else if (value && !rule.pattern.test(value)) {
          errors[key] = rule.message;
        }
      }
    }

    // return validation errors if any
    if (Object.keys(errors).length > 0) {
      return res.status(400).send(errors);
    }

    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!employee) {
      return res.status(404).send("Employee not found");
    }
    res.status(200).send(employee);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Controller function for deleting an employee by ID
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).send("Employee not found");
    }
    res.status(200).send("Employee deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
