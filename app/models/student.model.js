const sql = require("./db.js");

// constructor
const Student = function(student) {
  this.designation = student.designation;
  this.doj = student.doj;
  this.name = student.name;
};

Student.create = (newStudent, result) => {
  sql.query("INSERT INTO student SET ?", newStudent, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created student: ", { id: res.insertId, ...newStudent });
    result(null, { id: res.insertId, ...newStudent });
  });
};

Student.findByname = (studentname, result) => {
  sql.query(`SELECT * FROM student WHERE name = '${studentname}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found student: ", res);
      result(null, res);
      return;
    }

    // not found employee with the id
    result({ kind: "not_found" }, null);
  });
};


Student.getAll = result => {
  sql.query("SELECT * FROM student", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("student: ", res);
    result(null, res);
  });
};

Student.updateById = (id, student, result) => {
  sql.query(
    "UPDATE student SET designation = ?, doj = ?, name = ? WHERE id = ?",
    [student.designation, student.doj, student.name, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found employee with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated student: ", { id: id, ...student });
      result(null, { id: id, ...student });
    }
  );
};


Student.remove = (id, result) => {
  sql.query("DELETE FROM student WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found employee with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted student with id: ", id  );
    result(null, res);
  });
};

Student.removeAll = result => {
  sql.query("DELETE FROM student", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} students`);
    result(null, res);
  });

}


Student.innerjoin = result => {
  sql.query("SELECT student.id,employee.name FROM student INNER JOIN employee ON student.name=employee.name", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`INNERJOIN ${res} students`);
    result(null, res);
    return res
  });

}

module.exports = Student;