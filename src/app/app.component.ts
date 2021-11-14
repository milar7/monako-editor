import {Component} from '@angular/core';
import {
  CodeEditorLanguageType,
  CodeEditorMiniMap,
  CodeEditorOptions,
  CodeEditorTheme
} from "./component/code-editor/code-editor-configs";

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
    capacity = 101
    def eat(self, n):
        """Make the monkey eat n bananas!"""
        self.capacity -= n * banana.size

    def feeding_frenzy(self):
        self.eat(9.25)
        return "Yum yum"

  `;

  codeEditorOption:CodeEditorOptions={
    language:CodeEditorLanguageType.python,
    theme:CodeEditorTheme.highContrastDark,
    minimap:CodeEditorMiniMap.on
  }
}
