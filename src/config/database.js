const { Sequelize } = require('sequelize');

const isProduction = process.env.NODE_ENV === 'production' || process.env.DATABASE_URL;

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      protocol: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false // Necessário para conexões SSL no Render/Supabase
        }
      },
      logging: false
    })
  : new Sequelize({
      dialect: 'sqlite',
      storage: './database.sqlite',
      logging: false
    });

module.exports = sequelize;