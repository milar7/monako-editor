import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {
  MonacoEditorConstructionOptions,
  MonacoEditorLoaderService,
  MonacoStandaloneCodeEditor
} from "@materia-ui/ngx-monaco-editor";
import {CodeEditorMiniMap, CodeEditorOptions} from "./code-editor-configs";
import {filter, take} from "rxjs/operators";

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements OnChanges{
  // @ViewChild('ID', {static: true}) NAME: ElementRef | undefined;

  @Input() public options?: CodeEditorOptions;
  @Input() public value?: string="";


  defaultOptions: MonacoEditorConstructionOptions = {
    theme: 'vs',
    readOnly: false, minimap: {enabled: false},
    language:"javascript"
  };
  modelUri?: monaco.Uri;


  constructor(private monacoLoader: MonacoEditorLoaderService) {
    this.compelitionTest();
  }
  ngOnChanges(changes: SimpleChanges): void {
    const newOptions:MonacoEditorConstructionOptions={};
    newOptions.language=this.options?.language
    newOptions.minimap=this.options?.minimap===CodeEditorMiniMap.on?{enabled:true}:{enabled:false}
    newOptions.theme=this.options?.theme
    newOptions.value=this.value

    this.defaultOptions = this.mergeOptions(newOptions);
    console.log(this.options);
  }
  mergeOptions(moreOptions?: any) {
    if (!moreOptions) return this.defaultOptions;
    return {
      ...this.defaultOptions,
      ...moreOptions,
    }
  }

   createDependencyProposals(range:any) {
    // returning a static list of proposals, not even looking at the prefix (filtering is done by the Monaco editor),
    // here you could do a server side lookup
    return [
      {
        label: '"lodash"',
        kind: monaco.languages.CompletionItemKind.Function,
        documentation: 'The Lodash library exported as Node.js modules.',
        insertText: '"lodash": "*"',
        range: range
      },
      {
        label: '"express"',
        kind: monaco.languages.CompletionItemKind.Function,
        documentation: 'Fast, unopinionated, minimalist web framework',
        insertText: '"express": "*"',
        range: range
      },
      {
        label: '"mkdirp"',
        kind: monaco.languages.CompletionItemKind.Function,
        documentation: 'Recursively mkdir, like <code>mkdir -p</code>',
        insertText: '"mkdirp": "*"',
        range: range
      },
      {
        label: '"my-third-party-library"',
        kind: monaco.languages.CompletionItemKind.Function,
        documentation: 'Describe your library here',
        insertText: '"${1:my-third-party-library}": "${2:1.2.3}"',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range: range
      }
    ];
  }

  private async compelitionTest() {
    await this.monacoLoader.isMonacoLoaded$.pipe(filter(isLoaded => isLoaded), take(1)).toPromise();
    monaco.languages.registerCompletionItemProvider('python', {
      provideCompletionItems:  (model, position) =>{
        // find out if we are completing a property in the 'dependencies' object.
        var textUntilPosition = model.getValueInRange({
          startLineNumber: 1,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column
        });
        // var match = textUntilPosition.match(
        //   /"dependencies"\s*:\s*\{\s*("[^"]*"\s*:\s*"[^"]*"\s*,\s*)*([^"]*)?$/
        // );
        // if (!match) {
        //   return { suggestions: [] };
        // }
        var word = model.getWordUntilPosition(position);
        var range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn
        };
        return {
          suggestions: this.createDependencyProposals(range)
        };
      }
    });
  }


  init(editor: MonacoStandaloneCodeEditor) {
    console.log(editor.getOptions());
    // const options:IEditorOptions;
    // editor.updateOptions({value:this.value})
  }
}
