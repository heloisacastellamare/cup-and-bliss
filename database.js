const { Sequelize } = require('sequelize');

// Se houver DATABASE_URL (no Render), usa Postgres com SSL.
// Caso contrário, tenta usar a variável local ou o fallback.
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      protocol: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Obrigatório no Render/Supabase
        },
      },
      logging: false,
    })
  : new Sequelize('cup_and_bliss', 'postgres', 'sua_senha_local', {
      host: 'localhost',
      dialect: 'postgres',
      logging: false,
    });

module.exports = sequelize;