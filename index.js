const express = require("express");
const connectDB = require("./config/db")
const cors = require("cors");
const app = express();
const adminAuth = require("./middleware/adminAuth")
const studentAuth = require("./middleware/studentAuth")
const professorAuth = require("./middleware/profesorAuth")
connectDB();

app.use(cors()); // enable CORS for all routes
app.use(express.json({ extended: false }))

const port = process.env.PORT || 8000;


app.get("/servertest", (req, res) => res.send("API RUNNING"))

app.use("/api/login", require("./routes/login"))



// profesroi ka me i gjet vetem kursmen me id te profesorit 
// kurse studenti ka me mujt me i gjet te gjitha kurset qe jan me id te studentit
// tek mesazhet ka me pas post nga ana e profesorit, kurse nga ana e studentit duhet te kete post fhe get (post per me ndryshu sttusin seen !) 
// 


// ADMIN ROOTS
app.use("/api/admin/attendances", adminAuth, require("./routes/admin/attendances"));
app.use("/api/admin/courses", adminAuth, require("./routes/admin/courses"));
app.use("/api/admin/messages", adminAuth, require("./routes/admin/messages"));
app.use("/api/admin/users", adminAuth, require("./routes/admin/users"));
app.use("/api/admin/profile", adminAuth, require("./routes/admin/profile"));

// PROFESOR ROOTS
app.use("/api/professor/attendances", professorAuth, require("./routes/professors/attendances"));
app.use("/api/professor/courses", professorAuth, require("./routes/professors/courses"));
app.use("/api/professor/messages", professorAuth, require("./routes/professors/messages"));
app.use("/api/professor/users", professorAuth, require("./routes/professors/users"));
app.use("/api/professor/profile", professorAuth, require("./routes/professors/profile"));

// STUDNET ROOTS
app.use("/api/student/attendances", studentAuth, require("./routes/students/attendances"));
app.use("/api/student/courses", studentAuth, require("./routes/students/courses"));
app.use("/api/student/messages", studentAuth, require("./routes/students/messages"));
app.use("/api/student/profile", studentAuth, require("./routes/students/profile"));

// app.use("/api/mesages", require("./routes/mesages"))

var server = app.listen(port, () => console.log(`Server started on port ${port}`))

module.export = server;


