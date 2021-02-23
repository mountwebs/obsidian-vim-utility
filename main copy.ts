import { App, Notice, Plugin, PluginSettingTab, Setting, FileSystemAdapter} from 'obsidian';

const { exec } = require('child_process');

const processWithVim = (filePath: string, action: string = "edit") => {
	const command = action === "write" ? "w" : "";

	exec(`nvim -c 'e ${filePath}' -c '${command}q'`, (error: string, stdout: string, stderr: string) => {
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

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		console.log('loading plugin');

		await this.loadSettings();

		const adapter = this.app.vault.adapter as FileSystemAdapter;
		
		this.addCommand({
			id: 'vim-edit',
			name: 'Update note with nvim',
			checkCallback: (checking: boolean) => {
				const filePath = adapter.getFullPath(this.app.workspace.getActiveFile().path);
				if (filePath) {
					processWithVim(filePath);
					return true;
				}
				return false;
			}
		});

		this.addCommand({
			id: 'vim-write',
			name: 'Overwrite note with nvim',
			checkCallback: (checking: boolean) => {
				const filePath = adapter.getFullPath(this.app.workspace.getActiveFile().path);
				if (filePath) {
					processWithVim(filePath, "write");
					return true;
				}
				return false;
			}
		});
	}

	onunload() {
		console.log('unloading plugin');
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
