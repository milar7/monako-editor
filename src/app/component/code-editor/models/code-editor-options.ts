import {CodeEditorLanguage} from "../enums/code-editor-language";
import {CodeEditorMiniMap} from "../enums/code-editor-mini-map";
import {CodeEditorSuggestion} from "./code-editor-suggestion";

export interface CodeEditorOptions {
   language: CodeEditorLanguage;
   minimap?: CodeEditorMiniMap;
   suggestions?: CodeEditorSuggestion[]
}

