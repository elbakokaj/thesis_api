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

// PROFESOR ROOTS
app.use("/api/attendances", professorAuth, require("./routes/professors/attendances"));
app.use("/api/courses", professorAuth, require("./routes/professors/courses"));
app.use("/api/messages", professorAuth, require("./routes/professors/messages"));
app.use("/api/users", professorAuth, require("./routes/professors/users"));

// STUDNET ROOTS
app.use("/api/attendances", studentAuth, require("./routes/students/attendances"));
app.use("/api/courses", studentAuth, require("./routes/students/courses"));
app.use("/api/messages", studentAuth, require("./routes/students/messages"));

// app.use("/api/mesages", require("./routes/mesages"))

var server = app.listen(port, () => console.log(`Server started on port ${port}`))

module.export = server;


// admin TOKEN = Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmVkZjg3Y2VmYzU3ZTM4ZmEzNDU5ZiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20ifQ.tVkKAgvbC90yQ_s6sUPu3ySQP-yPus5FV2Dg41Wofms
// professor TOKEN = Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmVkZWUzY2VmYzU3ZTM4ZmEzNDU5ZSIsInJvbGUiOiJwcm9mZXNzb3IiLCJlbWFpbCI6InByb2Zlc3NvckBleGFtcGxlLmNvbSJ9.hla4XfgiTPVK4GR5YsVgH35AHz8h0VPhEnoZw7o7GG0
// student TOKEN = Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmVkZTU2Y2VmYzU3ZTM4ZmEzNDU5ZCIsInJvbGUiOiJzdHVkZW50IiwiZW1haWwiOiJzdHVkZW50QGV4YW1wbGUuY29tIn0.Rhg7gB7eY0qJYAoQhiMnNXT847z5zGs_pmjKQtKSET0