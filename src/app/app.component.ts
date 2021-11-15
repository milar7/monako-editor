import {Component} from '@angular/core';
import {
  CodeEditorOptions,
} from "./component/code-editor/models/code-editor-options";
import {CodeEditorLanguage} from "./component/code-editor/enums/code-editor-language";
import {CodeEditorMiniMap} from "./component/code-editor/enums/code-editor-mini-map";
import {CodeEditorSuggestion} from "./component/code-editor/models/code-editor-suggestion";

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
  sqlCode=""

  suggestions:CodeEditorSuggestion[]=[
    {key:"aasd",value:"111111111",type:"type 1"},
    {key:"asdasf",value:"122121212121",type:"type 2"},
    {key:"aasada",value:"22222222",type:"type 3"},
    {key:"asad",value:"333333333",type:"type 4"},
    {key:"asad",value:"333333333",type:"type 4"},
    {key:"asad",value:"333333333",type:"type 4"},
    {key:"asad",value:"333333333",type:"type 4"},
    {key:"asad",value:"333333333",type:"type 4"},
    {key:"asad",value:"333333333",type:"type 4"},
    {key:"asad",value:"333333333",type:"type 4"},
    {key:"asad",value:"333333333",type:"type 4"},
    {key:"asad",value:"333333333",type:"type 4"},
    {key:"asad",value:"333333333",type:"type 4"},
    {key:"asad",value:"333333333",type:"type 4"},
    {key:"asad",value:"333333333",type:"type 4"},
    {key:"asad",value:"333333333",type:"type 4"},
    {key:"asad",value:"333333333",type:"type 4"},
    {key:"asad",value:"333333333",type:"type 4"},
    {key:"asad",value:"333333333",type:"type 4"},
    {key:"asad",value:"333333333",type:"type 4"},
    {key:"asad",value:"333333333",type:"type 4"},
    {key:"asad",value:"333333333",type:"type 4"},
    {key:"asad",value:"333333333",type:"type 4"},
    {key:"asad",value:"333333333",type:"type 4"},
    {key:"asad",value:"333333333",type:"type 4"},
    {key:"asad",value:"333333333",type:"type 4"},
    {key:"asad",value:"333333333",type:"type 4"},
    {key:"asad",value:"333333333",type:"type 4"},
    {key:"asad",value:"333333333",type:"type 4"},

  ]

  codeEditorOption:CodeEditorOptions={
    language:CodeEditorLanguage.python,
    minimap:CodeEditorMiniMap.on,
    suggestions:this.suggestions
  }

  onClick() {
    console.log(this.pyCode);
  }
}
