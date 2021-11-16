import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {MonacoEditorConstructionOptions, MonacoEditorLoaderService,} from '@materia-ui/ngx-monaco-editor';
import {CodeEditorOptions} from './models/code-editor-options';
import {filter, take} from 'rxjs/operators';
import {CodeEditorMiniMap} from './enums/code-editor-mini-map';
import {CodeEditorSuggestionType} from "./enums/code-editor-suggestion-type";
import {MonacoStandaloneCodeEditor} from "@materia-ui/ngx-monaco-editor/lib/interfaces";
import {CodeEditorLanguage} from "./enums/code-editor-language";

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss'],
})
export class CodeEditorComponent implements OnChanges,OnInit{
  @Input() public options?: CodeEditorOptions;
  @Input() public value: string = '';
  @Output() public valueChange:EventEmitter<string>=new EventEmitter<string>();

  defaultOptions: MonacoEditorConstructionOptions = {
    minimap: { enabled: false },
    occurrencesHighlight:true
  };
  language:string="";
  editor?:MonacoStandaloneCodeEditor
  constructor(private monacoLoaderService: MonacoEditorLoaderService) {}

  ngOnChanges(): void {
    this.checkRequiredFields(this.options);
  }
  checkRequiredFields(input:any) {
    if(input === null || input===undefined) {
      throw new Error("Attribute 'options' is required");
    }
  }
  ngOnInit(): void {
    if (this.options)
    this.language=this.options.language.toString()
    if (this.options?.suggestions) {
      this.monacoLoaderService.isMonacoLoaded$.pipe(
        filter(isLoaded => isLoaded),
        take(1),
      ).subscribe(() => {
        this.provideAutoComplete().then()
      });
    }
    // if (this.options?.language===CodeEditorLanguage.python) {
    //
    //   this.monacoLoaderService.isMonacoLoaded$.pipe(
    //     filter(isLoaded => isLoaded),
    //     take(1),
    //   ).subscribe(() => {
    //     console.log("hello")
    //     this.setLanguageTokenizer();
    //   });
    // }

    }
  //
  // private setLanguageTokenizer() {
  //   monaco.languages.setMonarchTokensProvider("python",
  //     {
  //       defaultToken: '',
  //       tokenPostfix: '.python',
  //
  //       keywords: [
  //         'and',
  //         'as',
  //         'assert',
  //         'break',
  //         'class',
  //         'continue',
  //         'def',
  //         'del',
  //         'elif',
  //         'else',
  //         'except',
  //         'exec',
  //         'finally',
  //         'for',
  //         'from',
  //         'global',
  //         'if',
  //         'import',
  //         'in',
  //         'is',
  //         'lambda',
  //         'None',
  //         'not',
  //         'or',
  //         'pass',
  //         'print',
  //         'raise',
  //         'return',
  //         'self',
  //         'try',
  //         'while',
  //         'with',
  //         'yield',
  //
  //         'int',
  //         'float',
  //         'long',
  //         'complex',
  //         'hex',
  //
  //         'abs',
  //         'all',
  //         'any',
  //         'apply',
  //         'basestring',
  //         'bin',
  //         'bool',
  //         'buffer',
  //         'bytearray',
  //         'callable',
  //         'chr',
  //         'classmethod',
  //         'cmp',
  //         'coerce',
  //         'compile',
  //         'complex',
  //         'delattr',
  //         'dict',
  //         'dir',
  //         'divmod',
  //         'enumerate',
  //         'eval',
  //         'execfile',
  //         'file',
  //         'filter',
  //         'format',
  //         'frozenset',
  //         'getattr',
  //         'globals',
  //         'hasattr',
  //         'hash',
  //         'help',
  //         'id',
  //         'input',
  //         'intern',
  //         'isinstance',
  //         'issubclass',
  //         'iter',
  //         'len',
  //         'locals',
  //         'list',
  //         'map',
  //         'max',
  //         'memoryview',
  //         'min',
  //         'next',
  //         'object',
  //         'oct',
  //         'open',
  //         'ord',
  //         'pow',
  //         'print',
  //         'property',
  //         'reversed',
  //         'range',
  //         'raw_input',
  //         'reduce',
  //         'reload',
  //         'repr',
  //         'reversed',
  //         'round',
  //         'set',
  //         'setattr',
  //         'slice',
  //         'sorted',
  //         'staticmethod',
  //         'str',
  //         'sum',
  //         'super',
  //         'tuple',
  //         'type',
  //         'unichr',
  //         'unicode',
  //         'vars',
  //         'xrange',
  //         'zip',
  //
  //         'True',
  //         'False',
  //
  //         '__dict__',
  //         '__methods__',
  //         '__members__',
  //         '__class__',
  //         '__bases__',
  //         '__name__',
  //         '__mro__',
  //         '__subclasses__',
  //         '__init__',
  //         '__import__'
  //       ],
  //
  //       brackets: [
  //         {open: '{', close: '}', token: 'delimiter.curly'},
  //         {open: '[', close: ']', token: 'delimiter.bracket'},
  //         {open: '(', close: ')', token: 'delimiter.parenthesis'}
  //       ],
  //
  //       tokenizer: {
  //         root: [
  //           {include: '@whitespace'},
  //           {include: '@numbers'},
  //           {include: '@strings'},
  //
  //           [/[,:;]/, 'delimiter'],
  //           [/[{}\[\]()]/, '@brackets'],
  //
  //           [/@[a-zA-Z]\w*/, 'tag'],
  //           [/[a-zA-Z]\w*/, {
  //             cases: {
  //               '@keywords': 'keyword',
  //               '@default': 'identifier'
  //             }
  //           }]
  //         ],
  //
  //         // Deal with white space, including single and multi-line comments
  //         whitespace: [
  //           [/\s+/, 'white'],
  //           [/(^#.*$)/, 'comment'],
  //           [/('''.*''')|(""".*""")/, 'string'],
  //           [/'''.*$/, 'string', '@endDocString'],
  //           [/""".*$/, 'string', '@endDblDocString']
  //         ],
  //         endDocString: [
  //           [/\\'/, 'string'],
  //           [/.*'''/, 'string', '@popall'],
  //           [/.*$/, 'string']
  //         ],
  //         endDblDocString: [
  //           [/\\"/, 'string'],
  //           [/.*"""/, 'string', '@popall'],
  //           [/.*$/, 'string']
  //         ],
  //
  //         // Recognize hex, negatives, decimals, imaginaries, longs, and scientific notation
  //         numbers: [
  //           [/-?0x([abcdef]|[ABCDEF]|\d)+[lL]?/, 'number.hex'],
  //           [/-?(\d*\.)?\d+([eE][+\-]?\d+)?[jJ]?[lL]?/, 'number']
  //         ],
  //
  //         // Recognize strings, including those broken across lines with \ (but not without)
  //         strings: [
  //           [/'$/, 'string.escape', '@popall'],
  //           [/'/, 'string.escape', '@stringBody'],
  //           [/"$/, 'string.escape', '@popall'],
  //           [/"/, 'string.escape', '@dblStringBody']
  //         ],
  //         stringBody: [
  //           [/[^\\']+$/, 'string', '@popall'],
  //           [/[^\\']+/, 'string'],
  //           [/\\./, 'string'],
  //           [/'/, 'string.escape', '@popall'],
  //           [/\\$/, 'string']
  //         ],
  //         dblStringBody: [
  //           [/[^\\"]+$/, 'string', '@popall'],
  //           [/[^\\"]+/, 'string'],
  //           [/\\./, 'string'],
  //           [/"/, 'string.escape', '@popall'],
  //           [/\\$/, 'string']
  //         ]
  //       }
  //     }
  //   )
  // }

  onCodeChanged(newCode:string) {
    this.valueChange.emit(newCode)
  }
  editorInit(editor:MonacoStandaloneCodeEditor) {
  this.editor=editor;
    const newOptions: MonacoEditorConstructionOptions = {};
    newOptions.language = this.options?.language;
    newOptions.minimap =
      this.options?.minimap === CodeEditorMiniMap.on
        ? { enabled: true }
        : { enabled: false };
    newOptions.formatOnType=true;

    this.defaultOptions = this.mergeOptions(newOptions);



// //todo ?????????????
//     monaco.languages.registerDocumentFormattingEditProvider('csharp', {
//       provideDocumentFormattingEdits: function (model, options, token) {
//         return [
//           {
//             range: {
//               startLineNumber: 1,
//               startColumn: 1,
//               endLineNumber: 1,
//               endColumn: 1
//             },
//             text: 'a'
//           }
//         ];
//       }
//     });

  //todo remove if not needed!
    editor.addAction({
      id: 'ctrl-s-id',
      label: 'onSave',
      keybindings: [
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S,
      ],
      run:  (ed,args) =>{
        console.log("ctrl + s");
        editor.trigger("s", 'editor.action.formatDocument',"");
        return new Promise<void>(resolve => {});
      }
    });
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
        ?monaco.languages.CompletionItemKind.Issue //this will change to "T" as table in scss
        :monaco.languages.CompletionItemKind.User,//this will change to "C" as column in scss
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
