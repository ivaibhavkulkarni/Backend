const express = require("express")
const app = express();
const port = 10000
const connectDB = require("./config/db")
const UserRoute = require("./routes/UserRoute");
const SessionRoute = require("./routes/SessionRoute")
const {generateInterviewQuestions ,generateConceptExplanation} = require("./controllers/AiResponseController")

//Data Base
connectDB();

// middleware
app.use(express.json());

app.get('/', (req,res) => {
    res.send("PrepWise API's")
});

// User API
app.use('/user', UserRoute)


// Session API
app.use('/api/session', SessionRoute)

// AI API
app.post("/api/ai/generate-questions", generateInterviewQuestions);
app.post("/api/ai/generate-explanation", generateConceptExplanation)



app.listen(port, () => {
    console.log(`Server Running at http://Localhost:${port}`)
});

