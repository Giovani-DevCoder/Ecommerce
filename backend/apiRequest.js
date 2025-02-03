const axios = require('axios');

const FASTAPI_URL = 'http://127.0.0.1:8000/generate/'; 

async function getResponseFromModel(prompt) {
  try {
    const response = await axios.post(FASTAPI_URL, {
      prompt: prompt,
    });

    console.log(response.data.generated_text);
    return response.data.generated_text;
  } catch (error) {
    console.error('Error al hacer la solicitud a FastAPI:', error);
    return 'Hubo un error al generar la respuesta';
  }
}

getResponseFromModel("¿Cómo está el clima hoy?")
  .then((generatedText) => {
    console.log("Texto generado:", generatedText);
  });

