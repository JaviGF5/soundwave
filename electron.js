const electron = require("electron");             
const app = electron.app;                         
const BrowserWindow = electron.BrowserWindow;     
const path = require("path");                     
const isDev = require("electron-is-dev");  

let mainWindow;   
                                
// Desktop Window
function createWindow() {                         
  mainWindow = new BrowserWindow({                
    width: 1500,
    height: 1000,
    minWidth: 750,
    minHeight: 500,
    title: "Soundwave",
    titleBarStyle: "hiddenInset",
  });

  // Load APP
  mainWindow.loadURL(            
    // localhost:3000 - or - Compiled Application               
    isDev                                         
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`     
  );

  // Only for development -> Element inspector and others tools
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
