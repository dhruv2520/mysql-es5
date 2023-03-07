module.exports = app => {
    const students = require("../controllers/student.controller.js");
  
    // Create a new employee
    app.post("/students", students.create);
  
    // Retrieve all employees
     app.get("/students", students.findAll);
  
    // Retrieve a single employee with employeeId
     app.get("/students/:studentId", students.findOne);
  
    // Update a employee with employeeId
    app.put("/students/:studentId", students.update);
  
    // Delete a employee with employeeId
      app.delete("student/:studentId", students.delete);
  
    // Create a new employee
    app.delete("/deleteallstudents", students.deleteAll);
    
    // Create a join query
    app.get ("/datastudents", students.innerJoin);

  };





