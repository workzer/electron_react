const {
	app,
	BrowserWindow
} = require('electron')
const path = require('path')
const { exec } = require("child_process");

function createWindow() {
	var win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false, // Very important: https://www.electronjs.org/docs/tutorial/context-isolation
			preload: path.join(__dirname, 'preload.js')
		}
	})

	console.info('process.env', process.env.isDev);

	const startUrl = process.env.isDev? "http://localhost:3000" : url.format({
		pathname: path.join(__dirname, 'build/index.html'),
		protocol: 'file:',
		slashes: true
	});

	// win.loadFile('index.html')
	win.loadURL(startUrl);

	// Emitted when the window is closed.
	win.on('closed', function () {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		win = null
	})
}

app.whenReady().then(() => {
	createWindow()

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow()
		}
	})
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})