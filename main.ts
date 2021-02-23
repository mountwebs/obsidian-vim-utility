import {Plugin, FileSystemAdapter} from 'obsidian';

const { exec, spawn } = require('child_process');

const processWithVim = (filePath: string) => {
	console.log(`Processing ${filePath} with nvim.`)
	exec(`nvim -c 'e ${filePath}' -c 'wq'`, (error: string, stdout: string, stderr: string) => {
		if (error) {
				console.log(`error: ${error}`);
				return;
		}
		if (stderr) {
				console.log(`stderr: ${stderr}`);
				return;
		}
		console.log(`stdout: ${stdout}`);
	});
}

const newVim = (filePath: string, write = false) => {
	console.log(`Opening ${filePath} with MacVim.`)
	let openTerminalAtPath = spawn ('open', [ '-a', 'MacVim', filePath ]);
	openTerminalAtPath.on ('error', (err: Error) => { console.log (err); });	
}

export default class MyPlugin extends Plugin {
	async onload() {
		const adapter = this.app.vault.adapter as FileSystemAdapter;

		this.addCommand({
			id: 'process-with-nvim',
			name: 'Process note with nvim',
			callback: () => {
				const filePath = adapter.getFullPath(this.app.workspace.getActiveFile().path);
				if (filePath) {
					processWithVim(filePath);
				}
			}
		});

		this.addCommand({
			id: 'open-macvim',
			name: 'Open current note with MacVim',
			checkCallback: (checking: boolean) => {
				let leaf = this.app.workspace.activeLeaf;
				if (leaf) {	
					if (!checking) {
						const filePath = adapter.getFullPath(this.app.workspace.getActiveFile().path);
						// processWithVim(filePath, true);
						newVim(filePath);
					}
					return true;
				}
				return false;
			}
		});


		this.registerCodeMirror((cm: CodeMirror.Editor) => {
			console.log('codemirror', cm);
		});

		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}
}