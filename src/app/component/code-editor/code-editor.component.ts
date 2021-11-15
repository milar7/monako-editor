import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {MonacoEditorConstructionOptions, MonacoEditorLoaderService,} from '@materia-ui/ngx-monaco-editor';
import {CodeEditorOptions} from './models/code-editor-options';
import {filter, take} from 'rxjs/operators';
import {CodeEditorMiniMap} from './enums/code-editor-mini-map';
import {CodeEditorSuggestionType} from "./enums/code-editor-suggestion-type";
import {MonacoStandaloneCodeEditor} from "@materia-ui/ngx-monaco-editor/lib/interfaces";

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss'],
})
export class CodeEditorComponent {
  @Input() public options?: CodeEditorOptions;
  @Input() public value: string = '';
  @Output() public valueChange:EventEmitter<string>=new EventEmitter<string>();

  defaultOptions: MonacoEditorConstructionOptions = {
    minimap: { enabled: false },
  };

  constructor(private monacoLoaderService: MonacoEditorLoaderService) {}
  ngOnChanges(): void {
    this.checkRequiredFields(this.options);

    if (this.options?.suggestions) {
      this.monacoLoaderService.isMonacoLoaded$.pipe(
        filter(isLoaded => isLoaded),
        take(1),
      ).subscribe(() => {
        this.provideAutoComplete().then()
      });
    }
  }
  checkRequiredFields(input:any) {
    if(input === null || input===undefined) {
      throw new Error("Attribute 'options' is required");
    }
  }
  onCodeChanged(newCode:string) {
    this.valueChange.emit(newCode)
  }
  editorInit(editor:MonacoStandaloneCodeEditor) {

    const newOptions: MonacoEditorConstructionOptions = {};
    newOptions.language = this.options?.language;
    newOptions.minimap =
      this.options?.minimap === CodeEditorMiniMap.on
        ? { enabled: true }
        : { enabled: false };

    this.defaultOptions = this.mergeOptions(newOptions);

  }

  mergeOptions(moreOptions?: any) {
    if (!moreOptions) return this.defaultOptions;
    return {
      ...this.defaultOptions,
      ...moreOptions,
    };
  }

  createDependencyProposals(range: any) :any[]{
    return this.options?.suggestions?.map((suggestion) => {
      return {
      label: suggestion.key,
      kind: suggestion.type===CodeEditorSuggestionType.table
        ?monaco.languages.CompletionItemKind.Text
        :monaco.languages.CompletionItemKind.Class,
      documentation: suggestion.documentation?suggestion.documentation:"",
      insertText: suggestion.value,
      range: range,
    }
    }) as any[];

  }

  private async provideAutoComplete() {
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
