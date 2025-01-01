console.log("Hello from Citatio!")

const { app, BrowserWindow, Menu, MenuItem, ipcMain } = require("electron")
const fs = require("fs")
const path = require("path")

const documentsPath = app.getPath("documents")
const projectsPath = path.join(documentsPath, ".cite")
console.log(projectsPath)

let MainWindow

const CreateWindow = () => {
    MainWindow = new BrowserWindow({
        width: 900,
        height: 750,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false, // Disable for security
        },
    })

    MainWindow.loadFile("index.html")
}

const CreateNewProjectWindow = (MainWindow) => {
    const NewProjectWindow = new BrowserWindow({
        parent: MainWindow,
        modal: true,
        width: 400,
        height: 300,
        show: false,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
        },
    })

    NewProjectWindow.loadFile("scenes/newproject.html")
    NewProjectWindow.closable = false
    NewProjectWindow.resizable = false
    NewProjectWindow.once("ready-to-show", () => NewProjectWindow.show());
}

const CreateInfoMenu = (MainWindow) => {
    const InfoMenu = new BrowserWindow({
        parent: MainWindow,
        modal: true,
        width: 400,
        height: 300,
        show: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    })

    InfoMenu.loadFile("scenes/info.html")
    InfoMenu.closable = false
    InfoMenu.resizable = false
    InfoMenu.once("ready-to-show", () => InfoMenu.show());
}

const CustomMenu = new Menu();

CustomMenu.append(
    new MenuItem({
        label: "Project",
        submenu: [
            {
                label: "New",
                accelerator: process.platform === "darwin" ? "Cmd+N" : "Ctrl+N",
                click: () => {
                    console.log("Creating new project")
                    
                    if (MainWindow) {
                        CreateNewProjectWindow(MainWindow);
                    } else {
                        console.error("Main window not initialized!");
                    }
                }
            },
            {
                label: "Open",
                accelerator: process.platform === "darwin" ? "Cmd+O" : "Ctrl+O",
                click: () => console.log("Open Project clicked")
            },
            {
                label: "Save",
                accelerator: process.platform === "darwin" ? "Cmd+S" : "Ctrl+S",
                click: () => console.log("Save Project clicked")
            },
        ],
    })
);

// Append "Citatio" menu
CustomMenu.append(
    new MenuItem({
        label: "Citatio",
        submenu: [
            { label: "Help", click: () => console.log("Help clicked") },
            {
                label: "Info",
                accelerator: process.platform === "darwin" ? "Cmd+I" : "Ctrl+I",
                click: () => {
                    if (MainWindow) {
                        CreateInfoMenu(MainWindow);
                    } else {
                        console.error("Main window not initialized!");
                    }
                }
            },
            { type: "separator" },
            {
                label: "Exit app",
                accelerator: process.platform === "darwin" ? "Cmd+Esc" : "Ctrl+Esc",
                click: () => app.quit()
            },
        ],
    })
);

Menu.setApplicationMenu(CustomMenu)

app.whenReady().then(() => {

    if (!fs.existsSync(projectsPath)) {
        try {
            fs.mkdirSync(projectsPath)
            console.log(`Created .cite folder at ${projectsPath}`)
        } catch (error) {
            console.error(`Error creating folder: ${error.message}`)
        }
    } else {
        console.log(`Folder (${projectsPath}) already exists`)
    }

    CreateWindow()

    ipcMain.handle('ping', () => 'pong')
    ipcMain.handle('onNewProjectClick', () => {
        // New Project Stuffs
    })

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            CreateWindow()
        }
    })
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})