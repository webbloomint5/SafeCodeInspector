import * as vscode from 'vscode';
import { checkDeprecations } from './deprecationChecker';
import { checkVulnerabilities } from './vulnerabilityChecker';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.safeCodeInspect', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const text = document.getText();

            // Controllo deprecazioni
            const deprecations = checkDeprecations(text);
            // Controllo vulnerabilità
            const vulnerabilities = checkVulnerabilities(text);

            let message = '';
            if (deprecations.length > 0) {
                message += `Deprecazioni trovate:\n${deprecations.join('\n')}\n\n`;
            }
            if (vulnerabilities.length > 0) {
                message += `Vulnerabilità trovate:\n${vulnerabilities.join('\n')}`;
            }

            if (message) {
                vscode.window.showWarningMessage(message);
            } else {
                vscode.window.showInformationMessage('Nessuna deprecazione o vulnerabilità trovata.');
            }
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
