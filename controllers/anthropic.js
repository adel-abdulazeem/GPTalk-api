
const Anthropic = require('@anthropic-ai/sdk');
require("dotenv").config({ path: "../config/.env" });

async function* streamClaudeData(data) {
  for (const chunk of data) {
    await new Promise(resolve => setTimeout(resolve, 100));
    yield chunk;
  }}

module.exports = {
  generateRes: async (req, res) => {
    try {
      const {message} = req.body
      console.log(message)
      console.log(req.body)
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      // Send initial connection event
      const anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY
      });
      const stream = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        messages: [{ role: "user", content: message }],
        stream: true
      });
      // Stream the response
      for await (const event of stream) {
        if (event.type === 'content_block_delta') {
          const chunk = event.delta;

          let responseData = {
            type: 'text',
            content: chunk.text
          };
          // If the content contains diagram markers, change the type
          if (chunk.text && chunk.text.includes('```mermaid')) {
            responseData.type = 'diagram';
          }
          console.log(`data: ${JSON.stringify(responseData)}\n\n`);
          res.write(`data: ${JSON.stringify(chunk)}\n\n`);
        }
      }
      res.end();
    } catch (err) {
      console.error('Stream error:', err);
      if (!res.headersSent) {
        return res.status(500).json({
          status: 'error',
          message: 'Failed to start stream',
          error: process.env.NODE_ENV === 'development' ? err.message : 'Internal error'
        });
      }
    }
  },
};

