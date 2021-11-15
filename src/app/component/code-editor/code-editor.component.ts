import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  MonacoEditorConstructionOptions,
  MonacoEditorLoaderService,
  MonacoStandaloneCodeEditor,
} from '@materia-ui/ngx-monaco-editor';
import { CodeEditorOptions } from './models/code-editor-options';
import { filter, take } from 'rxjs/operators';
import { CodeEditorMiniMap } from './enums/code-editor-mini-map';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss'],
})
export class CodeEditorComponent {
  @Input() public options?: CodeEditorOptions;
  @Input() public value?: string = ''; //todo 2way bonding

  defaultOptions: MonacoEditorConstructionOptions = {
    theme: 'vs',
    readOnly: false,
    minimap: { enabled: false },
    language: 'javascript',
  };

  constructor(private monacoLoader: MonacoEditorLoaderService) {}
  ngOnChanges(changes: SimpleChanges): void {
    const newOptions: MonacoEditorConstructionOptions = {};
    newOptions.language = this.options?.language;
    newOptions.minimap =
      this.options?.minimap === CodeEditorMiniMap.on
        ? { enabled: true }
        : { enabled: false };
    newOptions.value = this.value;

    this.defaultOptions = this.mergeOptions(newOptions);
    if (this.options?.suggestions) this.provideAutoComplete().then();
  }
  mergeOptions(moreOptions?: any) {
    if (!moreOptions) return this.defaultOptions;
    return {
      ...this.defaultOptions,
      ...moreOptions,
    };
  }

  createDependencyProposals(range: any) :any[]{
    return this.options?.suggestions?.map((suggestion, index) => ({
      label: suggestion.key,
      kind: monaco.languages.CompletionItemKind.Class,
      documentation: suggestion.type,
      insertText: suggestion.value,
      range: range,
    })) as any[];

  }

  private async provideAutoComplete() {
    await this.monacoLoader.isMonacoLoaded$
      .pipe(
        filter((isLoaded) => isLoaded),
        take(1)
      )
      .toPromise();

    let language: string = 'sql';
    if (this.options?.language) language = this.options?.language.toString();
    monaco.languages.registerCompletionItemProvider(language, {
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };
        return {
          suggestions: this.createDependencyProposals(range),
        };
      },
    });
  }
}




// return [
//   {
//     label: '"lodash"',
//     kind: monaco.languages.CompletionItemKind.Function,
//     documentation: 'The Lodash library exported as Node.js modules.',
//     insertText: '"lodash": "*"',
//     range: range
//   },
//   {
//     label: '"express"',
//     kind: monaco.languages.CompletionItemKind.Function,
//     documentation: 'Fast, unopinionated, minimalist web framework',
//     insertText: '"express": "*"',
//     range: range
//   },
//   {
//     label: '"mkdirp"',
//     kind: monaco.languages.CompletionItemKind.Function,
//     documentation: 'Recursively mkdir, like <code>mkdir -p</code>',
//     insertText: '"mkdirp": "*"',
//     range: range
//   },
//   {
//     label: '"my-third-party-library"',
//     kind: monaco.languages.CompletionItemKind.Function,
//     documentation: 'Describe your library here',
//     insertText: '"${1:my-third-party-library}": "${2:1.2.3}"',
//     insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
//     range: range
//   }
// ];
