import fs from "fs";
import path from "path";
import {fileURLToPath} from 'url';

import dotenv from "dotenv";

dotenv.config();

// crear directorio logs en proyecto
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logDir = path.join(__dirname, "..", "logs");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// validar que tipo de log se van a generar como archivo
const logTypes = process.env.LOG_TYPES ? process.env.LOG_TYPES.split(",") : [];

// crear los archivos de los logs si no existen
logTypes.forEach((type) => {
  const logFile = path.join(logDir, `${type}.log`);
  if (!fs.existsSync(logFile)) {
    fs.writeFileSync(logFile, "");
  }
});

export default function CustomConsole(params) {
  const { origin, type = "log", info = "" } = params;

  const logFile = path.join(logDir, `${type}.log`);
  let logMessage = `[${new Date().toISOString()}] origin: ${origin}\n`;

  if (typeof info === 'string' || info instanceof String) {
    logMessage += `info: ${info}\n`;
  } else if (Array.isArray(info)) {
    logMessage += `info: {\n${info.map((item) => `${JSON.stringify(item)}`).join('\n')}\n}`;
  } else if (typeof info === 'object') {
    logMessage += `info:{ \n${Object.entries(info).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join('\n')}\n}`;
  }

  if (process.env.LOG_CONSOLE_ACTIVE === "true") {
    switch (type) {
      case "warn":
        console.warn(logMessage);
        break;
      case "error":
        console.error(logMessage);
        break;

      default:
        console.log(logMessage);
        break;
    }
  }

  if (logTypes.includes(type)) {
    fs.appendFile(logFile, logMessage, (err) => {
      if (err) {
        console.error(`Error al escribir en el archivo de log ${logFile}: ${err}`);
      }
    });
  }
}
