import express from "express"
import path from "path"
import bodyParser from "body-parser"
import multer from "multer"
import fs from "fs"
import { URL } from "url"
import cors from "cors"

const PORT = process.env.PORT || 2000
const __dirname = new URL(".", import.meta.url).pathname

// Storage de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { typeUser, codeUser, typeFile, subFolder } = req.params
        const dir =
            subFolder && subFolder !== "" ? path.join(__dirname, `uploads/${typeUser}/${codeUser}/${typeFile}/${subFolder}`) : path.join(__dirname, `uploads/${typeUser}/${codeUser}/${typeFile}`)
        const exist = fs.existsSync(dir)
        if (!exist) {
            fs.mkdirSync(dir, { recursive: true })
        }
        cb(null, dir)
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname
        cb(null, fileName)
    },
})

const upload = multer({ storage })

const app = express()

// Cors
app.use(
    cors({
        origin: "*",
        methods: ["DELETE", "OPTIONS", "GET", "POST"],
    })
)

// Middleware para analizar el cuerpo de la solicitud
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/api/upload/:typeUser/:codeUser/:typeFile/:subFolder?", upload.single("file"), (req, res) => {
    const file = req.file
    // Verificar si se ha enviado un archivo
    if (!file) {
        return res.status(400).send("No se ha enviado un archivo.")
    }
    // Archivo guardado en folder según params
    //enviar los nombres en respuesta
    //retornar el nombre del archivo para guardar en la base de datos
    res.status(200).send(file)
})

app.delete("/api/delete/:typeUser/:codeUser/:typeFile/:subFolder?/:id", (req, res, next) => {
    const { typeUser, codeUser, typeFile, subFolder, id } = req.params

    const filePath =
        subFolder && subFolder !== ""
            ? path.join(__dirname, `uploads/${typeUser}/${codeUser}/${typeFile}/${subFolder}/${id}`)
            : path.join(__dirname, `uploads/${typeUser}/${codeUser}/${typeFile}/${id}`)

    http: fs.unlink(filePath, (err) => {
        if (err) {
            // manejar el error
            console.error(err)
            res.status(404).json({ message: "Archivo no encontrado" })
            return false
        }

        res.json({ message: "Archivo eliminado" })
    })
})

// ruta para obtener una imagen en un tamaño específico
app.get("/api/files/:typeUser/:codeUser/:typeFile/:subFolder?/:id/:name?", async (req, res) => {
    const { typeUser, codeUser, typeFile, subFolder, id } = req.params
    const { size = "original" } = req.query

    // verificar que el tamaño solicitado sea uno de los tamaños válidos
    const sizes = ["original", "medium", "thumb"]
    if (!sizes.includes(size)) {
        return res.status(400).json({ message: "El tamaño solicitado no es válido." })
    }

    try {
        // leer la imagen del tamaño solicitado
        const filePath =
            subFolder && subFolder !== ""
                ? path.join(__dirname, `uploads/${typeUser}/${codeUser}/${typeFile}/${subFolder}/${id}`)
                : path.join(__dirname, `uploads/${typeUser}/${codeUser}/${typeFile}/${id}`)
        const file = fs.readFileSync(filePath)
        //PRIORITARIO validar el tipo de archivo para codificar el res con el tipo de archivo
        // enviar la imagen como respuesta
        //res.contentType("image/jpeg")
        res.send(file)
    } catch (err) {
        // responder con un error si la imagen no existe
        console.error(err)
        res.status(404).json({ message: "La imagen solicitada no existe." })
    }
})

// Ruta de ejemplo
app.post("/api/upload/avatar", upload.single("image"), (req, res) => {
    // Archivo guardado en folder según body
    res.status(200).json("fino")
})

// verificación de ruta no encontrada
app.use((req, res, next) => {
    res.status(404).json({ message: "Ruta no encontrada" })
})

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}.`)
})
