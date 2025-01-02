console.log("Hello from Citatio!")

const { app, BrowserWindow, Menu, MenuItem, ipcMain } = require("electron")
const { WindowUtils, FileUtils } = require("./js/index")
const fs = require("fs")
const path = require("path")

const documentsPath = app.getPath("documents")
const projectsPath = path.join(documentsPath, ".cite")
const metadataPath = path.join(projectsPath, ".metadata")
console.log(projectsPath)

app.whenReady().then(() => {

    if (!fs.existsSync(projectsPath)) {
        try {
            fs.mkdirSync(projectsPath)
            console.log(`Created .cite folder at ${projectsPath}`)
        } catch (error) {
            console.error(`Error creating folder: ${error.message}`)
        }
    }
    if (!fs.existsSync(metadataPath)){
        try {
            fs.mkdirSync(metadataPath)
            console.log(`Created .metadata folder at ${metadataPath}`)
        } catch (error) {
            console.error(`Error creating folder: ${error.message}`)
        }
    } else {
        console.log(`Folders (${projectsPath} and ${metadataPath}) already exists`)
    }
    ipcMain.handle('ping', () => 'pong')

    WindowUtils.CreateWindow()
    try {
        Menu.setApplicationMenu(WindowUtils.CustomMenu)
    } catch (error) {
        console.log(error.message)
    }
    

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            WindowUtils.CreateWindow()
        }
    })
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})