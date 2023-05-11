const Employee = require("../models/employee");
const { getPhoto } = require("../utils/getPhoto");

// Service function for create employee
exports.createEmployee = async (employeeData) => {
  try {
    // generate photo based on gender
    const photo = await getPhoto(employeeData.gender);

    // create new employee with validated data
    const data = {
      ...employeeData,
      photo: photo,
    };
    const employee = new Employee(data);
    await employee.save();
    return employee;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Service function for getting all employees
exports.getAllEmployees = async () => {
  try {
    const employees = await Employee.find();
    return employees;
  } catch (error) {
    throw new Error("Error getting employees");
  }
};

// Service function for updating an employee by ID
exports.updateEmployee = async (id, data) => {
  try {
    const employee = await Employee.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!employee) {
      throw new Error("Employee not found");
    }
    return employee;
  } catch (error) {
    throw new Error("Error updating employee");
  }
};

// Service function for deleting an employee by ID
exports.deleteEmployee = async (id) => {
  try {
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      throw new Error("Employee not found");
    }
    return "Employee deleted successfully";
  } catch (error) {
    throw new Error("Error deleting employee");
  }
};
