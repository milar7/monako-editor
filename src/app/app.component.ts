import {Component} from '@angular/core';
import {CodeEditorOptions,} from "./component/code-editor/models/code-editor-options";
import {CodeEditorLanguage} from "./component/code-editor/enums/code-editor-language";
import {CodeEditorMiniMap} from "./component/code-editor/enums/code-editor-mini-map";
import {CodeEditorSuggestion} from "./component/code-editor/models/code-editor-suggestion";
import {CodeEditorSuggestionType} from "./component/code-editor/enums/code-editor-suggestion-type";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'monaco';
  pyCode = `
import banana

class Monkey:
    # Bananas the monkey can eat.
    capacity = 10
    def eat(self, n):
        """Make the monkey eat n bananas!"""
        self.capacity -= n * banana.size

    def feeding_frenzy(self):
        self.eat(9.25)
        return "Yum yum"

  `;
  sqlCode="asas"

  suggestions:CodeEditorSuggestion[]=[
    {key:"aasd",value:"111111111",type:CodeEditorSuggestionType.table},
    {key:"asdasf",value:"122121212121",type:CodeEditorSuggestionType.column},
    {key:"aasada",value:"22222222",type:CodeEditorSuggestionType.table},


  ]

  codeEditorOption:CodeEditorOptions={
    language:CodeEditorLanguage.sql,
    minimap:CodeEditorMiniMap.off,
    suggestions:this.suggestions
  }

  onClick() {
    console.log(this.sqlCode);
  }
}
