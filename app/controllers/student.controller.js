const Student = require("../models/student.model.js");

// Create and Save a new employee
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    // Create a Employee
    const student = new Student({
        designation: req.body.designation,
        doj: req.body.doj,
        name: req.body.name,
    });

    // Save Employee in the database
    Student.create(student, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Employee."
        });
        else res.send(data);
    });
};

// Retrieve all employees from the database.
exports.findAll = (req, res) => {
    Student.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving employees."
          });
        else res.send(data);
    });
};

// Find a single employee with a employeeId
exports.findOne = (req, res) => {
    Student.findByname(req.params.name, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Student with name ${req.params.name}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Student with name " + req.params.name
            });
          }
        } else res.send(data);
    });
};

// Update an employee identified by the employeeId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }

    Student.updateById(
        req.params.studentId,
        new Student(req.body),
        (err, data) => {
            if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                message: `Not found Student with id ${req.params.studentId}.`
                });
            } else {
                res.status(500).send({
                message: "Error updating Student with id " + req.params.studentId
                });
            }
            } else res.send(data);
        }
    );
};

// Delete an employee with the specified employeeId in the request
exports.delete = (req, res) => {
    Student.remove(req.params.studentId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Student with id ${req.params.studentId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Student with id " + req.params.studentId
            });
          }
        } else res.send({ message: `Student was deleted successfully!` });
    });
};

// Delete all  from Student the database.
exports.deleteAll = (req, res) => {``
Student.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all students."
        });
      else res.send({ message: `All Students were deleted successfully!` });
  });
};

exports.innerjoin = (req, res) => {``
Student.innerjoin((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all students."
        });
      else res.send({ message: `All Students were join successfully!`,data });
      console.log('data:>>>>>>>>>>>>>> ', data);
  });
};


// left join

exports.leftjoin = (req, res) => {``
Student.leftjoin((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all students."
        });
      else res.send({ message: `All Students were leftjoin successfully!`,data });
  });
};

