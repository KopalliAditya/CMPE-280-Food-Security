// server.js
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const FormData = require('form-data');

const app = express();
const port = 3001;
app.use(cors());

app.use(bodyParser.json());

app.post('/api/query', async (req, res) => {
  const userPrompt = req.body.prompt;
  
  const pdfPath = path.join(__dirname, 'Pdf-model.pdf');

  try {
    // Upload the PDF file to chatpdf
    const formData = new FormData();
    formData.append('file', fs.createReadStream(pdfPath));

    const options = {
      headers: {
        'x-api-key': 'sec_DRV8ImZjH5AIstwDBR73872CsxlpuOKJ', // Replace with your actual API key
        ...formData.getHeaders(),
      },
    };

    const chatPdfResponse = await axios.post('https://api.chatpdf.com/v1/sources/add-file', formData, options);

    const sourceId = 'src_5DpbdV2sJqj5eBxt5Sq1B'; //chatPdfResponse.data.sourceId;
    console.log("Source ID:", sourceId);

    // Make a chatPDF query using the userPrompt
    const chatApiConfig = {
      headers: {
        'x-api-key': 'sec_DRV8ImZjH5AIstwDBR73872CsxlpuOKJ', // Replace with your actual API key
        'Content-Type': 'application/json',
      },
    };

    const chatApiData = {
      sourceId: sourceId,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    };

    const chatApiResponse = await axios.post('https://api.chatpdf.com/v1/chats/message', chatApiData, chatApiConfig);
    const chatContent = chatApiResponse.data.content;

    console.log("Result:", chatContent);

    // Send the response back to the client
    res.json({ sourceId, chatContent });
  } catch (error) {
    console.error('Error processing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
