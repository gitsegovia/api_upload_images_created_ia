import "dotenv/config"
import express from "express"
import path from "path"
import bodyParser from "body-parser"
import multer from "multer"
import { unlink, mkdirSync, existsSync, rm, cpSync, readFileSync } from "node:fs"
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
        const exist = existsSync(dir)
        if (!exist) {
            mkdirSync(dir, { recursive: true })
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

// Ruta para subir múltiples archivos
app.post("/api/uploads/:typeUser/:codeUser/:typeFile/:subFolder?", upload.array("files", 10), (req, res) => {
    const files = req.files // Array de archivos subidos

    // Verificar si se han enviado archivos
    if (!files || files.length === 0) {
        return res.status(400).send("No se han enviado archivos.")
    }

    // Si hay más de 10 archivos, devolver un error
    if (files.length > 10) {
        return res.status(400).send("El número máximo de archivos permitidos es 10.")
    }

    // Enviar los nombres de los archivos como respuesta
    const fileNames = files.map((file) => file.filename)
    res.status(200).json({ message: "Archivos subidos correctamente", files: fileNames })
})

// Ruta para borrar imagen especifica
app.delete("/api/delete/:typeUser/:codeUser/:typeFile/:subFolder?/:id", (req, res, next) => {
    const { typeUser, codeUser, typeFile, subFolder, id } = req.params

    const filePath =
        subFolder && subFolder !== ""
            ? path.join(__dirname, `uploads/${typeUser}/${codeUser}/${typeFile}/${subFolder}/${id}`)
            : path.join(__dirname, `uploads/${typeUser}/${codeUser}/${typeFile}/${id}`)

    unlink(filePath, (err) => {
        if (err) {
            // manejar el error
            console.error(err)
            res.status(404).json({ message: "Archivo no encontrado" })
            return false
        }

        res.json({ message: "Archivo eliminado" })
    })
})

// Ruta para borrar carpeta
app.delete("/api/delete/:typeUser/:codeUser/:typeFile/:subFolder", (req, res, next) => {
    const { typeUser, codeUser, typeFile, subFolder } = req.params

    const folderPath = path.join(__dirname, `uploads/${typeUser}/${codeUser}/${typeFile}/${subFolder}`)

    rm(folderPath, { recursive: true }, (err) => {
        if (err) {
            // manejar el error
            console.error(err)
            res.status(404).json({ message: "Carpeta no encontrada" })
            return false
        }

        res.json({ message: "Carpeta eliminada" })
    })
})

// Ruta para duplicar carpeta
app.post("/api/duplicate/:typeUser/:codeUser/:typeFile/:subFolder/:newSubFolder", (req, res) => {
    const { typeUser, codeUser, typeFile, subFolder, newSubFolder } = req.params

    // Ruta del subfolder original
    const sourceDir = path.join(__dirname, `uploads/${typeUser}/${codeUser}/${typeFile}/${subFolder}`)

    // Verificar si el subfolder original existe
    if (!existsSync(sourceDir)) {
        return res.status(404).json({ message: "El subfolder no existe." })
    }

    // Crear un nuevo nombre para el subfolder duplicado (puedes personalizar esto)
    const destinationDir = path.join(__dirname, `uploads/${typeUser}/${codeUser}/${typeFile}/${newSubFolder}`)

    // Verificar si el nuevo subfolder ya existe
    if (existsSync(destinationDir)) {
        return res.status(400).json({ message: "El subfolder duplicado ya existe." })
    }

    try {
        // Copiar el contenido del subfolder original al nuevo subfolder
        cpSync(sourceDir, destinationDir, { recursive: true })

        // Respuesta exitosa
        res.status(200).json({ message: "Subfolder duplicado correctamente.", newSubFolder: newSubFolder })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error al duplicar el subfolder." })
    }
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
        if (id === "null" || id === null) {
            return res.status(404).json({ message: "La imagen solicitada no existe." })
        }
        // leer la imagen del tamaño solicitado
        const filePath =
            subFolder && subFolder !== ""
                ? path.join(__dirname, `uploads/${typeUser}/${codeUser}/${typeFile}/${subFolder}/${id}`)
                : path.join(__dirname, `uploads/${typeUser}/${codeUser}/${typeFile}/${id}`)

        // Determine content type based on file extension
        const ext = path.extname(id).toLowerCase()
        let contentType = "application/octet-stream" // Default to a generic binary file

        switch (ext) {
            case ".jpg":
            case ".jpeg":
                contentType = "image/jpeg"
                break
            case ".png":
                contentType = "image/png"
                break
            case ".gif":
                contentType = "image/gif"
                break
            case ".webp":
                contentType = "image/webp"
                break
            // Add more image types as needed
        }

        const file = readFileSync(filePath)

        // Set the Content-Type header
        res.contentType(contentType)
        // send the image as response
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
