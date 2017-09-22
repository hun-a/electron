import { app } from 'electron';
import createMainWindow from './createMainWindow';
import setAppMenu from './setAppMenu';
import showSaveAsNewFileDialog from './showSaveAsNewFileDialog';
import createFileManager from './createFileManager';

let mainWindow = null;
let fileManager = null;

function openFile() {
  console.log('openFile');
}

function saveFile() {
  console.log('saveFile');
}

function saveAsNewFile() {
  Promise.all([ showSaveAsNewFileDialog(), mainWindow.requestText() ])
  .then(([filePath, text]) => fileManager.saveFile(filePath, text))
  .catch(err => {
    console.log(err);
  });
}

function exportPDF() {
  console.log('exportPDF');
}

app.on('ready', () => {
  mainWindow = createMainWindow();
  fileManager = createFileManager();
  setAppMenu({ openFile, saveFile, saveAsNewFile, exportPDF });
});

app.on('window-all-closed', () => {
  if (process.platform === 'darwin') {
    app.quit();
  }
});

app.on('activate', (_e, hasVisibleWindows) => {
  if (!hasVisibleWindows) {
    mainWindow = createMainWindow();
  }
});
