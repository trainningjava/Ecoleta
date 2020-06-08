// Importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose();

// Criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db");

module.exports = db;

// Utilizar o objeto de banco de dados, para nossas operações

db.serialize(() => {

/**
 * Parametros
 * 2 Insert
 * 3 Select All
 * 4 Delete
 * 5 Delete All
 */


  const step=1
// COM COMMANDOS SQL QUE EU VOU:


    console.log("=========================================================")
    console.log("C R E A T E")
    console.log("=========================================================")
    // Criar uma tabela
    db.run(`
    CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image TEXT,
        name TEXT,
        address TEXT,
        address2 TEXT,
        state TEXT,
        city TEXT,
        items TEXT
    );
    `);
    // após digite o comando node src/database/db.js
if (step==2) {

console.log("=========================================================")
console.log("I N S E R T")
console.log("=========================================================")
// Inserir dados na tabela

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
  
  const values = [ {
  "image":"https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1101&q=80",
  "name":"Coletoria",
  "address":"Guilherme Gemballa, Jardim América",
  "address2":"Nº 260",
  "state":"Santa Catarina",
  "city":"Rio do Sul",
  "items":"Resíduos Eletrônicos, Lâmpadas",
  }, {
  
      "image":"https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      "name":"Papersider",
      "address":"Guilherme Gemballa, Jardim América",
      "address2":"Nº 260",
      "state":"Santa Catarina",
      "city":"Rio do Sul",
      "items":"Papéis e Papelão",
  }];
  
  function afterInsertData(err) {
    if (err) {
      return console.log(err);
    }
  
    console.log("Cadastrado com sucesso");
    console.log(this);
  }
  
  
  // comando que adicionar informações na tabela
  for(var i = 0; i < values.length; i++) {
      const  arrObject = values[i];
      const arrvalues = []
    for(var key in arrObject){
        if(arrObject.hasOwnProperty(key)) {
            arrvalues.push(arrObject[key]);
            console.info(arrObject[key]);
        }
   }      
   db.run(query, arrvalues, afterInsertData);

}
  
  // após digite o comando node src/database/db.js
  // e comente o comando db.run(query, values, afterInsertData);
  // para não adicionar novas informações

} else if (step == 3 ) {
    console.log("=========================================================")
    console.log("S E L E C T * A L L") 
    console.log("=========================================================")
    // Consultar os dados da tabela

    db.all(`SELECT * FROM places`, function (err, rows) {
      if (err) {
        return console.log(err);
      }

      console.log("Aqui estão seus registros: ");
      console.log(rows);
    });
    // após digite o comando node src/database/db.js
    // e mostrará o registro da tabela places

} else if (step==4) {
    console.log("=========================================================")
    console.log("D E L E T E")
    console.log("=========================================================")
    // Deletar um dado da tabela
    db.run(`DELETE FROM places WHERE id = ?`, [1], function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("Registro excluido com sucesso!");
    });

} else if (step==5) {
    console.log("=========================================================")
    console.log("D E L E T E * A L L")
    console.log("=========================================================")

    db.run(`DELETE FROM places`, function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("Todos os registro excluido com sucesso!");
  });

}


});
