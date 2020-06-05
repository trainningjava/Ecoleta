const express = require("express");
const server = express();

const db = require("./database/db");

// Configura a rota para a pasta PUBLICA
server.use(express.static("public"));

// Habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }));

// Utilizando template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

/*
  Configura as rotas para a aplicação
  página inicial
  Parametros :
          req: Requisicao
          res: Resposta
*/
server.get("/", (req, res) => {
  return res.render("index.html");
});

/* ============================================================== */
/*                      C R E A T E - P O I N T                   */
/* ============================================================== */
server.get("/create-point", (req, res) => {
  return res.render("create-point.html");
});

/* ============================================================== */
/*                         S A V E P O I N T                      */
/* ============================================================== */
server.post("/savepoint", (req, res) => {
  const query = `
  INSERT INTO places (
    image,
    name,
    address,
    address2,
    state,
    city,
    items
  ) VALUES (?,?,?,?,?,?,?);
`;

  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items,
  ];

  function afterInsertData(err) {
    if (err) {
      console.log("Erro no cadastro");
      console.log(err);
      // return res.send("Erro no cadastro");
      return res.render("create-point.html", { msg: true });
    }

    console.log("Cadastrado com sucesso");
    console.log(this);
    return res.render("create-point.html", { saved: true });
  }
  db.run(query, values, afterInsertData);
});

/* ============================================================== */
/*                         S E A R C H                            */
/* ============================================================== */
server.get("/search", (req, res) => {
  const search = req.query.search;

  if (search == "") {
    // pesquisa com parametro vazio
    // Mostrar a página html com os dados do banco de dados
    return res.render("search-results.html", { total: 0 });
  }

  // Pegar os dados do banco de dados
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (
    err,
    rows
  ) {
    if (err) {
      console.log(err);
      return res.send("Erro na consulta");
    }

    console.log("Aqui estão seus registros: ");
    console.log(rows);

    const total = rows.length;
    // Mostrar a página html com os dados do banco de dados
    return res.render("search-results.html", { places: rows, total });
  });
});

//ligar o servidor
server.listen(3000);
