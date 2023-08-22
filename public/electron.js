const electron = require("electron");             
const app = electron.app;                         
const BrowserWindow = electron.BrowserWindow;     

const path = require("path");                     
const isDev = require("electron-is-dev");         

let mainWindow;   
                                
// Crea la ventana de la app
function createWindow() {                         
  mainWindow = new BrowserWindow({                
    width: 1500,
    height: 1000,
    minWidth: 750,
    minHeight: 500,
    title: "Soundwave",
    titleBarStyle: "hiddenInset",
  });

  // Cargar nuestra app de React
  mainWindow.loadURL(            
    // En desarrollo -> Carga localhost:3000. Si no, nuestra app compilada                 
    isDev                                         
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`     
  );

  // Activa inspector de elementos y otras herramientas
  // if (isDev) mainWindow.webContents.openDevTools();     

  mainWindow.on("closed", () => (mainWindow = null));   
}

app.on("ready", createWindow);                      
                                                    
app.on("window-all-closed", () => {                 
  if (process.platform !== "darwin") {              
    app.quit();
  }
});

app.on("activate", () => {                          
  if (mainWindow === null) {                        
    createWindow();
  }
});
