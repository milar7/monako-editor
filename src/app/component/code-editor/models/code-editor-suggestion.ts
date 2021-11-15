import {CodeEditorSuggestionType} from "../enums/code-editor-suggestion-type";

export interface CodeEditorSuggestion {
  key:string;
  value:string;
  type:CodeEditorSuggestionType;
  documentation?:string;
}
