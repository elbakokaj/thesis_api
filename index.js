const express = require("express");
const connectDB = require("./config/db")
const cors = require("cors");
const app = express();
const userAuth = require("./middleware/auth")
connectDB();

app.use(cors()); // enable CORS for all routes
app.use(express.json({ extended: false }))

const port = process.env.PORT || 8000;
app.get("/servertest", (req, res) => res.send("API RUNNING"))

app.use("/api/login", require("./routes/auth"))

// profesroi ka me i gjet vetem kursmen me id te profesorit 
// kurse studenti ka me mujt me i gjet te gjitha kurset qe jan me id te studentit
// tek mesazhet ka me pas post nga ana e profesorit, kurse nga ana e studentit duhet te kete post fhe get (post per me ndryshu sttusin seen !) 
// 

app.use("/api/users", require("./routes/users"))
app.use("/api/messages", require("./routes/messages"))
app.use("/api/courses", require("./routes/courses"))



// PROFESOR ROOTS
app.use("/api/attendances", userAuth, require("./routes/profesors/attendances"))
app.use("/api/courses", require("./routes/profesors/courses"))

// app.use("/api/mesages", require("./routes/mesages"))

var server = app.listen(port, () => console.log(`Server started on port ${port}`))

module.export = server;