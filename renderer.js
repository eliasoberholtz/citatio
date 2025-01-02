const information = document.getElementById('info')
information.innerText = `This app is using:\n- Chrome (v${versions.chrome()})\n- Node.js (v${versions.node()})\n- Electron (v${versions.electron()})`

const NewProjectBtn = document.getElementById("NewProjectSubmit")
const NewProjectName = document.getElementById("NewProjectName")
const NewProjectSaveType = document.getElementById("SaveType")