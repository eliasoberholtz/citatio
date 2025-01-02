const { BrowserWindow, Menu, MenuItem } = require("electron")
const path = require("path")

let MainWindow
let CustomMenu

const CreateWindow = () => {
    MainWindow = new BrowserWindow({
        width: 900,
        height: 750,
        webPreferences: {
            preload: path.join(__dirname, '../preload.js'),
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
            preload: path.join(__dirname, '../preload.js'),
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
            preload: path.join(__dirname, '../preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    })

    InfoMenu.loadFile("scenes/info.html")
    InfoMenu.closable = false
    InfoMenu.resizable = false
    InfoMenu.once("ready-to-show", () => InfoMenu.show());
}

CustomMenu = new Menu();

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
)

// Adding the Citations menu item
CustomMenu.append(
    new MenuItem({
        label: "Sources",
        submenu: [
            {
                label: "New",
                accelerator: process.platform === "darwin" ? "Cmd+Alt+N" : "Ctrl+Alt+N",
                click: () => {
                    console.log("Creating new citation")
                }
            },
            {
                label: "Edit Source",
                accelerator: process.platform === "darwin" ? "Cmd+Alt+E" : "Ctrl+Alt+E",
                click: () => {
                    console.log("To edit source")
                }
            }
        ],
    })
)

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
)

module.exports = {
    CustomMenu,
    CreateWindow,
    CreateNewProjectWindow,
    CreateInfoMenu
}