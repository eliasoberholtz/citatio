console.log("Hello from Citatio!")

const { app, BrowserWindow, Menu, MenuItem} = require("electron")

const CustomMenu = new Menu();
CustomMenu.append(new MenuItem({
    label: "Project", submenu: [
        new MenuItem({ label: "New", click: () => {}} ),
        new MenuItem({ label: "Open", click: () => {} }),
        new MenuItem({ label: "Save", click: () => {} }),

        new MenuItem({ type: 'separator' }),

        new MenuItem({ label: "Exit app", click: app.quit() }),
    ]})
)

const CreateWindow = () => {
    const Win = new BrowserWindow({
        width: 700,
        height: 600
    })

    Win.loadFile("main.html")
    Menu.setApplicationMenu(CustomMenu)
}

app.whenReady().then(() => {
    CreateWindow()

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