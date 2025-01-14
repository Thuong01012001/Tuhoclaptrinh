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

// Hàm kiểm tra kết nối cơ sở dữ liệu
const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
    process.exit(1);  // Dừng quá trình nếu không kết nối được
  }
};

// Hàm tải các model từ thư mục models
const loadModels = async () => {
  try {
    const modelsDir = path.join(__dirname, '../models');
    console.log('Scanning models directory:', modelsDir);

    const files = await fs.readdir(modelsDir);
    console.log('Files in models directory:', files);

    const modelFiles = files.filter(
      (file) =>
        file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.js' &&
        file.indexOf('.test.js') === -1
    );

    console.log('Filtered model files:', modelFiles);

    // Load all models
    for (const file of modelFiles) {
      const modelPath = path.join(modelsDir, file);
      const modelModule = await import(`file://${modelPath}`);
      const model = modelModule.default(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
      console.log(`Model loaded: ${model.name}`);
    }

    // Thiết lập quan hệ giữa các model nếu có
    Object.keys(db).forEach((modelName) => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });

  } catch (err) {
    console.error('Error loading models or syncing database:', err);
  }
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Kiểm tra kết nối và sau đó tải models
await checkConnection();
await loadModels();

export default db;
