import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import fs from 'fs'
import sharp from 'sharp';
import jwtoken from 'jsonwebtoken';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

const { verify, sign } = jwtoken;

const app = express();

app.use(cors());

// Middleware para analizar el cuerpo de la solicitud
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware personalizado para verificar el campo esperado
const validateField = (fieldName) => (req, res, next) => {
  console.log(req.body.file)
  if (!req.body[fieldName]) {
    return res.status(400).send({ error: `El campo ${fieldName} no existe` });
  }
  next();
};

// middleware para verificar el token de acceso
function verifyToken(req, res, next) {
  // obtener el token de acceso de la cabecera de autorización
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  // si no hay token, responder con un error 401
  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó un token de acceso.' });
  }

  // verificar y decodificar el token de acceso
  verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'El token de acceso es inválido.' });
    }

    // si el token es válido, agregar el objeto decodificado a la solicitud
    req.user = decoded;

    // continuar con la siguiente función de middleware
    next();
  });
}

// ruta de autenticación para generar un token de acceso
app.post('/api/auth', (req, res) => {
  const { username, password } = req.body;
  console.log('QUE LLEGA ',username, password)
  // validar los detalles de autenticación del usuario
  // ...

  // si la autenticación es exitosa, generar un token de acceso
  const token = sign({ username, password }, process.env.JWT_SECRET);

  // enviar el token de acceso al cliente
  res.json({ token });
});

// ruta para subir una imagen y guardarla en tres tamaños diferentes
app.post('/api/images', verifyToken, upload.single('image'), async (req, res) => {
  // Verificar si se ha enviado un archivo
  if (!req.file) {
    return res.status(400).send('No se ha enviado un archivo.');
  }

  // Procesar archivo y crear versiones en diferentes tamaños
  const { filename } = req.file;

  try {
    // crear la imagen original
    await sharp(req.file.path)
      .jpeg({ quality: 80 })
      .toFile(`uploads/${filename}-original.jpg`);

    // crear la imagen de tamaño mediano
    await sharp(req.file.path)
      .resize({ width: 640 })
      .jpeg({ quality: 80 })
      .toFile(`uploads/${filename}-medium.jpg`);

    // crear la imagen de tamaño thumbnail
    await sharp(req.file.path)
      .resize({ width: 160 })
      .jpeg({ quality: 80 })
      .toFile(`uploads/${filename}-thumb.jpg`);

    // responder con un mensaje de éxito
    res.json({ message: 'La imagen se ha subido y procesado correctamente.', filename: filename });
  } catch (err) {
    // responder con un error si ocurre algún problema
    console.error(err);
    res.status(500).json({ message: 'Ocurrió un error al procesar la imagen.' });
  }

  // eliminar el archivo subido
  fs.unlinkSync(req.file.path);
});

// ruta para obtener una imagen en un tamaño específico
app.get('/api/images/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { size } = req.query;

  // verificar que el tamaño solicitado sea uno de los tamaños válidos
  const sizes = ['original', 'medium', 'thumb'];
  if (!sizes.includes(size)) {
    return res.status(400).json({ message: 'El tamaño solicitado no es válido.' });
  }

  try {
    // leer la imagen del tamaño solicitado
    const imagePath = `uploads/${id}-${size}.jpg`;
    const image = fs.readFileSync(imagePath);

    // enviar la imagen como respuesta
    res.contentType('image/jpeg');
    res.end(image, 'binary');
  } catch (err) {
    // responder con un error si la imagen no existe
    console.error(err);
    res.status(404).json({ message: 'La imagen solicitada no existe.' });
  }
});

// iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000.');
});

