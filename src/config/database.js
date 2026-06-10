const mysql = require("mysql2/promise");
require("dotenv").config();

// Pool de conexões com MySQL usando Promises
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "sabordigital",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;

//database

async function runMigration() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'sabordigital',
    });

    console.log('✔️ Conectado ao banco de dados');

    // Verifica se a coluna 'foto' já existe
    const [columns] = await connection.execute(
      "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='produto' AND COLUMN_NAME='foto'"
    );

    if (columns.length === 0) {
      await connection.execute(
        "ALTER TABLE produto ADD COLUMN foto VARCHAR(255) DEFAULT NULL"
      );
      console.log('✅ Coluna "foto" adicionada com sucesso à tabela "produto"!');
    } else {
      console.log('⚠️ Coluna "foto" já existe na tabela "produto"');
    }

    await connection.end();
  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

runMigration();