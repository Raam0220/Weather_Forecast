import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const SearchHistory = sequelize.define('SearchHistory', {
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  temperature: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  searchedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default SearchHistory;
