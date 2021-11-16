import {Component} from '@angular/core';
import {CodeEditorOptions,} from "./component/code-editor/models/code-editor-options";
import {CodeEditorLanguage} from "./component/code-editor/enums/code-editor-language";
import {CodeEditorMiniMap} from "./component/code-editor/enums/code-editor-mini-map";
import {CodeEditorSuggestion} from "./component/code-editor/models/code-editor-suggestion";
import {CodeEditorSuggestionType} from "./component/code-editor/enums/code-editor-suggestion-type";
import {CodeExamples} from "./code-examples";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  cSharpCode:string=CodeExamples.cSharpCode
  rCode:string=CodeExamples.rCode
  pyCode:string=CodeExamples.pyCode
  matlabCode:string=CodeExamples.matlabCode
  sqlCode:string=CodeExamples.sqlCode
  suggestions:CodeEditorSuggestion[]=[
    {key:"Student",value:"Student",type:CodeEditorSuggestionType.table,documentation:"student table"},
    {key:"Id",value:"Id",type:CodeEditorSuggestionType.column},
    {key:"Name",value:"Name",type:CodeEditorSuggestionType.column},

  ]

  sqlEditorOption:CodeEditorOptions={
    language:CodeEditorLanguage.sql,
    minimap:CodeEditorMiniMap.on,
    suggestions:this.suggestions
  }
  cSharpEditorOption:CodeEditorOptions={
    language:CodeEditorLanguage.csharp,
    minimap:CodeEditorMiniMap.on,
  }
  rEditorOption:CodeEditorOptions={
    language:CodeEditorLanguage.r,
    minimap:CodeEditorMiniMap.off,
  }
  pyEditorOption:CodeEditorOptions={
    language:CodeEditorLanguage.python,
    minimap:CodeEditorMiniMap.on,
  }
  matlabEditorOption:CodeEditorOptions={
    language:CodeEditorLanguage.matlab,
    minimap:CodeEditorMiniMap.on,
  }

}
