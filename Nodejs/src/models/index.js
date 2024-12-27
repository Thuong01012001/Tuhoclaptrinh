import { Sequelize } from 'sequelize';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);

// Đường dẫn tới config
const configJsonPath = path.join(__dirname, '../config/config.json');
const configJson = JSON.parse(await fs.readFile(configJsonPath, 'utf-8'));

const env = process.env.NODE_ENV || 'development';
const config = configJson[env];

const db = {};

// Tạo kết nối Sequelize
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Hàm tải các model
const loadModels = async () => {
  try {
    const modelsDir = __dirname;
    console.log('Scanning models directory:', modelsDir);

    const files = await fs.readdir(modelsDir);
    const modelFiles = files.filter(
      (file) =>
        file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.js' &&
        file.indexOf('.test.js') === -1
    );

    for (const file of modelFiles) {
      const modelModule = await import(path.join(modelsDir, file));
      const model = modelModule.default || modelModule;
      db[model.name] = model;
    }

    // Thiết lập quan hệ giữa các model
    Object.keys(db).forEach((modelName) => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });
  } catch (err) {
    console.error('Error loading models:', err);
  }
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;