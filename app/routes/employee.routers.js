module.exports = app => {
    const employees = require("../controllers/employee.controller.js");
  
    // Create a new employee
    app.post("/employees", employees.create);
  
    // Retrieve all employees
     app.get("/employees", employees.findAll);
  
    // Retrieve a single employee with employeeId
     app.get("/employees/:employeeId", employees.findOne);
  
    // Update a employee with employeeId
    app.put("/employees/:employeeId", employees.update);
  
    // Delete a employee with employeeId
     app.delete("/:employeeId", employees.delete);
  
    // Create a new employee
      app.delete("/employees", employees.deleteAll);
  };