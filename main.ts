import { App, Modal, Notice, Plugin, PluginSettingTab, Setting, FileSystemAdapter} from 'obsidian';

const { exec } = require('child_process');

const processWithVim = (filePath: string, write = false) => {
	console.log(filePath)
	exec(`nvim -c 'e ${filePath}' -c 'q'`, (error: string, stdout: string, stderr: string) => {
		if (error) {
				console.log(`error: ${error}`);
				return;
		}
		if (stderr) {
				console.log(`stderr: ${stderr}`);
				return;
		}
		console.log(`stdout: ${stdout}`);
		console.log("noe")
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


		this.addRibbonIcon('dice', 'Sample Plugin', () => {
			new Notice('This is a notice!');
		});

		this.addStatusBarItem().setText('Status Bar Text');

		this.addCommand({
			id: 'nvim-edit',
			name: 'Update note',
			// callback: () => {
			// 	console.log('Simple Callback');
			// },
			checkCallback: (checking: boolean) => {
				let leaf = this.app.workspace.activeLeaf;
				if (leaf) {
					if (!checking) {

						const filePath = adapter.getFullPath(this.app.workspace.getActiveFile().path);
						processWithVim(filePath);
					}
					return true;
				}
				return false;
			}
		});

		this.addCommand({
			id: 'nvim-write',
			name: 'Write to note',
			// callback: () => {
			// 	console.log('Simple Callback');
			// },
			checkCallback: (checking: boolean) => {
				let leaf = this.app.workspace.activeLeaf;
				if (leaf) {
					if (!checking) {
						const filePath = adapter.getFullPath(this.app.workspace.getActiveFile().path);
						processWithVim(filePath, true);

					}
					return true;
				}
				return false;
			}
		});

		this.addSettingTab(new SampleSettingTab(this.app, this));

		this.registerCodeMirror((cm: CodeMirror.Editor) => {
			console.log('codemirror', cm);
		});

		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
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

class SampleModal extends Modal {
	constructor(app: App, ) {
		super(app);
	}

	onOpen() {
		let {contentEl} = this;	
		contentEl.setText(this.app.workspace.getActiveFile().path);

	}

	onClose() {
		let {contentEl} = this;
		contentEl.empty();
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		let {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Settings for my awesome plugin.'});

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue('')
				.onChange(async (value) => {
					console.log('Secret: ' + value);
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
