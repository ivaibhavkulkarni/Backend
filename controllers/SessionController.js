const Session = require("../models/Session")
const Question = require("../models/Question")

// Create a new Session

const createSession = async (req, res) => {
  try {

    const { role, experience, topicsToFocus, description, questions } = req.body;

    const session = await Session.create({
      role,
      experience,
      topicsToFocus,
      description,
    });

    console.log("Session created:", session);

    const questionDocs = await Promise.all(
      questions.map(async (q) => {
        console.log("Creating question:", q); // Debug log
        const question = await Question.create({
          session: session._id,
          question: q.question,
          answer: q.answer,
        });
        return question._id;
      })
    );

    session.questions = questionDocs;
    await session.save();

    res.status(201).json({ success: true, session });
  } catch (error) {
    console.error("Error in createSession:", error); 
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get all Session

const getMySessions = async (Req,res) => {
    try{
        const sessions = await Session.find().populate("questions");

        res.status(200).json({success: true, sessions})
    }catch(error){
        res.status(500).json({ success: false, message: "Server Error" });

    }
}


// Delete Session by id

const deleteById = async (req,res) => {
    try{
        const session = await Session.findByIdAndDelete(req.params.id);

        if(!session) {
            return res.status(404).json({ message: "Session not found"})
        }

        res.status(200).json({ message: "Session deleted successfully"});

    }catch(error){
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

module.exports = {createSession, getMySessions, deleteById};