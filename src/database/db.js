// Importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose();

// Criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db");

module.exports = db;

// Utilizar o objeto de banco de dados, para nossas operações

// db.serialize(() => {
// COM COMMANDOS SQL QUE EU VOU:

//=========================================================
//  C R E A T E
//=========================================================
// Criar uma tabela
// db.run(`
//   CREATE TABLE IF NOT EXISTS places (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     image TEXT,
//     name TEXT,
//     address TEXT,
//     address2 TEXT,
//     state TEXT,
//     city TEXT,
//     items TEXT
//   );
// `);
// após digite o comando node src/database/db.js

//=========================================================
//  I N S E R T
//=========================================================
// Inserir dados na tabela
// const query = `
//   INSERT INTO places (
//     image,
//     name,
//     address,
//     address2,
//     state,
//     city,
//     items
//   ) VALUES (?,?,?,?,?,?,?);
// `;

// const values = [
//   "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1101&q=80",
//   "Coletoria",
//   "Guilherme Gemballa, Jardim América",
//   "Nº 260",
//   "Santa Catarina",
//   "Rio do Sul",
//   "Resíduos Eletrônicos, Lâmpadas",
// ];

// const values = [
//   "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//   "Papersider",
//   "Guilherme Gemballa, Jardim América",
//   "Nº 260",
//   "Santa Catarina",
//   "Rio do Sul",
//   "Papéis e Papelão",
// ];

// function afterInsertData(err) {
//   if (err) {
//     return console.log(err);
//   }

//   console.log("Cadastrado com sucesso");
//   console.log(this);
// }

// comando que adicionar informações na tabela
// db.run(query, values, afterInsertData);

// após digite o comando node src/database/db.js
// e comente o comando db.run(query, values, afterInsertData);
// para não adicionar novas informações

//=========================================================
//  S E L E C T
//=========================================================
// Consultar os dados da tabela

// db.all(`SELECT * FROM places`, function (err, rows) {
//   if (err) {
//     return console.log(err);
//   }

//   console.log("Aqui estão seus registros: ");
//   console.log(rows);
// });
// após digite o comando node src/database/db.js
// e mostrará o registro da tabela places

//=========================================================
//  D E L E T E
//=========================================================
// Deletar um dado da tabela
// db.run(`DELETE FROM places WHERE id = ?`, [1], function (err) {
//   if (err) {
//     return console.log(err);
//   }

//   console.log("Registro excluido com sucesso!");
// });

//=========================================================
//  D E L E T E * A L L
//=========================================================
//   db.run(`DELETE FROM places`, function (err) {
//     if (err) {
//       return console.log(err);
//     }

//     console.log("Registro excluido com sucesso!");
//   });
// });
