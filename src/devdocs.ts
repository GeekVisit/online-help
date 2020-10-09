import * as vscode from 'vscode';

const vsLanguages = ['typescript', 'typescriptreact', 'javascript', 'html', 'css', 'c', 'cpp', 'java', 'python'];

const dedocsLanguages = ['ts', 'ts', 'js', 'html', 'css', 'c', 'cpp', 'java', 'python'];

export class Devdocs {
  static openLink(): boolean {
    if (vscode.workspace.getConfiguration().get('online-help.devdocs', true)) {
      const activeTextEditor = vscode.window.activeTextEditor;
      const languageId = activeTextEditor.document.languageId;
      const index = vsLanguages.indexOf(languageId);
      if (index >= -1) {
        const selection = activeTextEditor.selection;
        if (selection && !selection.isEmpty) {
          const text = activeTextEditor.document.getText(selection).trim();
          const keyword = text.toLowerCase();
          vscode.env.openExternal(vscode.Uri.parse(`http://devdocs.io/#q=${dedocsLanguages[index]} ${keyword}`));
          return true;
        }
      }
    }
    return false;
  }
}