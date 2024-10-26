const express = require("express");
const bodyParser = require("body-parser");
const ExcelJS = require("exceljs");
const { jsPDF } = require("jspdf"); // Importando jsPDF
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, "public")));

const jsonFilePath = path.join(__dirname, "pedidos.json");
const excelFilePath = path.join(__dirname, "pedidos.xlsx");

const readJSON = () => {
  if (fs.existsSync(jsonFilePath)) {
    const data = fs.readFileSync(jsonFilePath);
    return JSON.parse(data);
  }
  return [];
};

const saveJSON = (data) => {
  fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2));
};

const createExcelSheet = async (data) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Pedidos");

  worksheet.columns = [
    { header: "Nome", key: "nome", width: 30 },
    { header: "Número", key: "numero", width: 15 },
    { header: "Tipo Sanguíneo", key: "tipoSanguineo", width: 20 },
    { header: "Manga M", key: "mangaM", width: 10 },
    { header: "Manga G", key: "mangaG", width: 10 },
    { header: "Manga GG", key: "mangaGG", width: 10 },
    { header: "Regata M", key: "regataM", width: 10 },
    { header: "Regata G", key: "regataG", width: 10 },
    { header: "Regata GG", key: "regataGG", width: 10 },
  ];

  data.forEach((item) => {
    worksheet.addRow(item);
  });

  await workbook.xlsx.writeFile(excelFilePath);
  console.log("Planilha Excel gerada com sucesso em:", excelFilePath);
};

app.post("/pedidos", async (req, res) => {
  const { nome, numero, tipoSanguineo, carrinho } = req.body;

  const pedidos = readJSON();
  const contagem = {
    mangaM: 0,
    mangaG: 0,
    mangaGG: 0,
    regataM: 0,
    regataG: 0,
    regataGG: 0,
  };

  carrinho.forEach((item) => {
    const { tipo, tamanho, quantidade } = item;
    if (tipo === "manga") {
      if (tamanho === "M") contagem.mangaM += quantidade;
      else if (tamanho === "G") contagem.mangaG += quantidade;
      else if (tamanho === "GG") contagem.mangaGG += quantidade;
    } else if (tipo === "regata") {
      if (tamanho === "M") contagem.regataM += quantidade;
      else if (tamanho === "G") contagem.regataG += quantidade;
      else if (tamanho === "GG") contagem.regataGG += quantidade;
    }
  });

  const novoPedido = {
    nome,
    numero,
    tipoSanguineo: tipoSanguineo === "não sei" ? null : tipoSanguineo,
    ...contagem,
  };
  pedidos.push(novoPedido);
  saveJSON(pedidos);
  if (fs.existsSync(excelFilePath)) {
    fs.unlinkSync(excelFilePath);
  }
  await createExcelSheet(pedidos);

  res.status(200).json({ message: "Pedido recebido com sucesso!" });
});

// Rota para carregar a página HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});
app.get("/logo", (req, res) => {
  const imagePath = path.join(
    __dirname,
    "../public/img",
    "marinha-removebg-preview.png"
  );
  res.sendFile(imagePath);
});

app.get("/download", (req, res) => {
  res.download(excelFilePath, "pedidos.xlsx", (err) => {
    if (err) {
      console.error("Erro ao enviar o arquivo:", err);
      res.status(500).send("Erro ao baixar a planilha.");
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
