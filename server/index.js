require('dotenv').config()
const Express = require('express')
const cors = require('cors')
const PORT = process.env.PORT
const app = Express()
const router = require('./router/router.js')
const axios = require("axios");

app.use(cors())
app.use(Express.json())
app.use(router)

const pingApi = async () => {
  try {
    const response = await axios.get("https://marinha.onrender.com"); // 
    console.log("API está ativa:", response.status);
  } catch (error) {
    console.error("Erro ao verificar a API:", error.message);
  }
};

setInterval(pingApi, 15000);


app.listen(PORT, () => console.log('server is running'))