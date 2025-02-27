const { CohereClient } = require( 'cohere-ai');
require("dotenv").config({ path: "./config/.env" });

module.exports = {
  generateRes: async (req, res) => {
    try {
    const {message} = req.body
    console.log(message)
    console.log(req.body)
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    const cohere = new CohereClient({
    token: process.env.COHERE_API_TOKEN,
    });
    
    const stream = await cohere.chatStream({
        model: "command",
        message: message,
    });

    for await (const chat of stream) {
        if (chat.eventType === "text-generation") {

        console.log( `data: ${JSON.stringify({ data : chat.text })}\n\n`)
        res.write(`data: ${JSON.stringify({ data: chat.text })}\n\n`);
        res.write(`event: complete\ndata: ${JSON.stringify({ status: 'done' })}\n\n`);
        }        
    }
      res.end();
    } catch (err) {
        console.error('Error:', err);
        res.write(`event: error\ndata: ${JSON.stringify({ error: err.message })}\n\n`);
        res.end();
    }
  },
};
  
