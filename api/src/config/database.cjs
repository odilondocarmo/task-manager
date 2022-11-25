require('dotenv').config();

module.exports = {
  dialect: process.env.DB_CONNECTION || 'mysql',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'mysql',
  database: process.env.DB_DATABASE || 'task_manager',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};
