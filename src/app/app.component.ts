import {Component} from '@angular/core';
import {CodeEditorLanguageType, CodeEditorOptions, CodeEditorTheme} from "./component/code-editor/code-editor-configs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'monaco';


  codeEditorOption:CodeEditorOptions={
    language:CodeEditorLanguageType.python,
    theme:CodeEditorTheme.highContrastDark
  }
}
