const { GoogleGenAI } = require("@google/genai")
const { conceptExplainationPrompt, questionAnswerPrompt} = require("../utils/prompts");
require('dotenv').config();

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY})

// Generate interview Questions

const generateInterviewQuestions = async (req,res) => {
    try{

        console.log("REQUEST BODY:", req.body); 

        const { role, experience, topicsToFocus, numberOfQuestions } = req.body

        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

        const response = await ai.models.generateContent({
             model: "gemini-2.0-flash-lite",
            contents: prompt,
        });

        let rawText = response.text;

        // Clean it: Remove ```Json and ``` beginning and end
        const cleanedText = rawText
            .replace(/^```json\s*/,"") // remove starting ``` json
            .replace(/```$/,"") // remove ending ```
            .trim(); // remove extra spaces

        // Now safe to parse 
        const data = JSON.parse(cleanedText);
        res.status(200).json(data);


    }catch(error){
        res.status(500).json({
            message: "Failed to generate questions",
            error: error.message,
        });
    }
}


const generateConceptExplanation = async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({ message: "Missing required field: question" });
        }

        const prompt = conceptExplainationPrompt(question);

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: prompt,
        });

        let rawText = response.text;

        // Clean response: remove ```json ... ```
        const cleanedText = rawText
            .replace(/^```json\s*/, "")
            .replace(/```$/, "")
            .trim();

        const data = JSON.parse(cleanedText);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: "Failed to generate explanation",
            error: error.message,
        });
    }
};


module.exports = {generateInterviewQuestions, generateConceptExplanation};