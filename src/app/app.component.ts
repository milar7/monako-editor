import {Component} from '@angular/core';
import {CodeEditorLanguageType, CodeEditorOptions, CodeEditorTheme} from "./component/code-editor/code-editor-configs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'monaco';
  typescriptCode = `
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

  codeEditorOption:CodeEditorOptions={
    language:CodeEditorLanguageType.python,
    theme:CodeEditorTheme.highContrastDark
  }
}
