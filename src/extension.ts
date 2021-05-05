// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import { dirname, extname } from 'path'
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate (context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "new-file-with-name-of-selected" is now active!')

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match th	e command field in package.json
	let disposable = vscode.commands.registerCommand('new-file-with-name-of-selected.helloWorld', async () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		const editor = vscode.window.activeTextEditor
		if (!editor) {
			return // No open text editor
		}

		const selection = editor.selection
		const selectedText = editor.document.getText(selection)
		const activeFilePath = vscode.window.activeTextEditor?.document.fileName
		if (!activeFilePath || !selectedText) {
			return
		}
		const activeFileDirectory = dirname(activeFilePath)
		const activeFileExtension = extname(activeFilePath)
		const newFilePath = `${activeFileDirectory}/${selectedText}${activeFileExtension}`
		const fileUri = vscode.Uri.file(newFilePath)
		await vscode.workspace.fs.writeFile(fileUri, Buffer.from(''))
		const doc = await vscode.workspace.openTextDocument(newFilePath)
		vscode.window.showTextDocument(doc)
	})

	context.subscriptions.push(disposable)
}

// this method is called when your extension is deactivated
export function deactivate () { }
