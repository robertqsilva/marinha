const ExcelJS = require("exceljs");

const criarPlanilha = async (pedidos) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Pedidos");

  // Definindo as colunas da planilha
  worksheet.columns = [
    { header: "Número", key: "numero", width: 15 },
    { header: "Nome", key: "nome", width: 30 },
    { header: "Tipo Sanguíneo", key: "tiposanguineo", width: 15 },
    { header: "Manga M", key: "mangam", width: 10 },
    { header: "Manga G", key: "mangag", width: 10 },
    { header: "Manga GG", key: "mangagg", width: 10 },
    { header: "Regata M", key: "regatam", width: 10 },
    { header: "Regata G", key: "regatag", width: 10 },
    { header: "Regata GG", key: "regatagg", width: 10 },
  ];

  // Estilizando os cabeçalhos
  worksheet.getRow(1).font = { bold: true };
  worksheet.getRow(1).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFCCCCCC" },
  };

  // Adicionando bordas a todas as células, incluindo cabeçalhos e dados
  const border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };

  // Adicionando os registros à planilha e aplicando bordas
  pedidos.forEach((pedido) => {
    const row = worksheet.addRow({
      numero: pedido.numero,
      nome: pedido.nome,
      tiposanguineo: pedido.tiposanguineo == 'nao-sei'? '----------':pedido.tiposanguineo,
      mangam: pedido.mangam,
      mangag: pedido.mangag,
      mangagg: pedido.mangagg,
      regatam: pedido.regatam,
      regatag: pedido.regatag,
      regatagg: pedido.regatagg,
    });

    // Aplicando bordas a cada célula da linha adicionada
    row.eachCell({ includeEmpty: true }, (cell) => {
      cell.border = border;
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });
  });

  // Adicionando bordas aos cabeçalhos
  worksheet.getRow(1).eachCell((cell) => {
    cell.border = border;
  });

  // Definindo autofiltro para a primeira linha
  worksheet.autoFilter = "A1:I1";

  // Gerando o buffer da planilha
  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
};

module.exports = { criarPlanilha };
