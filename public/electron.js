const {app, BrowserWindow, Menu, ipcMain, dialog} = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
var fs = require('fs')
const exec = require('child_process').exec;
const psTree = require('ps-tree');

let mainWindow;
var child;
function createWindow() {
    mainWindow = new BrowserWindow({ 
        width: 1200, 
        height: 800,
        icon: '../../Assets/crawless.png',
        backgroundColor: '#151515',
        title: 'Crawless',
        webPreferences:{
            webSecurity: false,
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false
        }
    });
    mainWindow.loadURL(
        isDev
        ? "http://localhost:3000"
        : `file://${path.join(__dirname, "../build/index.html")}`
    );
    mainWindow.on("closed", () => (mainWindow = null));
    mainWindow.webContents.openDevTools()
}

// Menu.setApplicationMenu(null)

function makeCommand(filepath){
    // console.log(filepath)
    let filename = path.basename(filepath);
    let ext = filename.split('.')[1];
    let currentFileDir = path.join(filepath,'..');
    let command = "cd " + currentFileDir + " && ";
    switch(ext){
        case "py":
            command += 'python ' + filename + ' < input.txt';
            break;
        case "java":
            command += 'javac ' + filename + ' && java ' + filename.split('.')[0] + ' < input.txt';
            break;
        case "c":
            if(process.platform === "win32"){
                command += 'gcc ' + filename + ' -o ' + filename.split('.')[0] + ' && ' + filename.split('.')[0] + '.exe < input.txt';
            }else{
                command += 'gcc ' + filename + ' -o ' + filename.split('.')[0] + ' && ./' + filename.split('.')[0] + ' < input.txt';
            }
            break;
        case "cpp":
            if(process.platform === "win32"){
                command += 'g++ ' + filename + ' -o ' + filename.split('.')[0] + ' && ' + filename.split('.')[0] + '.exe < input.txt';
            }else{
                command += 'g++ ' + filename + ' -o ' + filename.split('.')[0] + ' && ./' + filename.split('.')[0] + ' < input.txt';
            }
            break;
        case "js":
            command += 'node ' + filename + ' < input.txt';
            break;
        case "rb":
            command += 'ruby ' + filename + ' < input.txt';
            break;
        case "pl":
            command += 'perl ' + filename + ' < input.txt';
            break;
        case "cs":
            command += 'csc ' + filename + ' < input.txt';
            break;
        case "php":
            command += 'php ' + filename + ' < input.txt';
            break;
        case "go":
            command += 'go run ' + filename + ' < input.txt';
            break;
        case "s":
            if(process.platform === "win32"){
                command += 'g++ ' + filename + ' -o ' + filename.split('.')[0] + ' && ' + filename.split('.')[0] + '.exe < input.txt';
            }else{
                command += 'g++ ' + filename + ' -o ' + filename.split('.')[0] + ' && ./' + filename.split('.')[0] + ' < input.txt';
            }
            break;
        default:
            command = undefined;
            break;
    }
    return command;
}

function killProcess (pid, signal, callback) {
    signal   = signal || 'SIGKILL';
    callback = callback || function () {};
    var killTree = true;
    if(killTree) {
        psTree(pid, function (err, children) {
            [pid].concat(
                children.map(function (p) {
                    return p.PID;
                })
            ).forEach(function (tpid) {
                try { process.kill(tpid, signal) }
                catch (ex) { }
            });
            callback();
        });
    } else {
        try { process.kill(pid, signal) }
        catch (ex) { }
        callback();
    }
};

ipcMain.on('saveFile', (event, txtVal)=>{
    fs.writeFile('',txtVal, (err)=>{
        if(!err){
            console.log('File written')
        } else {
            console.log(err)
        }
    })
    fs.writeFileSync('', txtVal)

    fs.appendFile('',txtVal, (err)=>{
        if(!err){
            console.log('File written')
        } else {
            console.log(err)
        }
    })
})

ipcMain.on('runProgram',function(event,input,filepath){
    if(filepath !== undefined){//mainWindow.webContents.send('error',"You didn't open or save any file yet");
        // else{
        let command = makeCommand(filepath);
        if(command === undefined) mainWindow.webContents.send('error',"Build system not found for this programming language..");
        else{
            let currentFileDir = path.join(filepath,'..');
            let inputFile = path.join(currentFileDir,'input.txt');
            fs.writeFile(inputFile, input, function(err,data){
                if(err){
                    console.log(err);
                    mainWindow.webContents.send('runProgramStatus',err.message);
                    // console.log(err.message);
                }else{
                    child = exec(command,{maxBuffer: 1024 * 10000} , function(err,stdout,stderr){
                        if(err){
                            console.log(err, 'line 324');
                            killProcess(child.pid);
                            // child.kill();
                            // console.log(child);
                            console.log(err);
                            if(child.killed){
                                err.message = "Process has been killed"
                            }
                            mainWindow.webContents.send('runProgramStatus',err.message);
                            // console.log(err.message.split('\n')[1]);
                        }else{
                            mainWindow.webContents.send('runProgramStatus',stdout);
                            // console.log(stdout);
                        }
                    });
                }
            });
        }
    }
});

ipcMain.on('stopProgram', function(event){
    if(child){
        child.killed = true;
        killProcess(child.pid);

    }
});

ipcMain.on('saveFile', function(){
    dialog.showSaveDialog(function (filename){
        if(filename === undefined){
            console.log('You did not save the file')
            return;
        }
        var content;
        fs.writeFile(filename, content, function(err){
            if(err){
                alert('An error ocurred creating the file' + err.message)
            }
            alert('The file has been successfully')
        })
    })
})

ipcMain.on('openFile', function(){
    dialog.showOpenDialog(function(fileNames){
        if(fileNames === undefined){
            console.log('No file selected')
            return;
        }
        fs.readFile(fileNames[0], 'utf-8', function(err, data){
            if(err){
                alert('An erro occurred reading the file :' + err.message)
                return;
            }
            document.getElementById('editor').value = data;
        })
    })
})

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