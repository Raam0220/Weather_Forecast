import sequelize from '../config/db.config.js';
import SearchHistory from './SearchHistory.js';

await sequelize.sync({ alter: true });

export { sequelize, SearchHistory };
