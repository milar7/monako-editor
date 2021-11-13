import {Component, Input} from '@angular/core';
import {MonacoEditorConstructionOptions, MonacoEditorLoaderService} from "@materia-ui/ngx-monaco-editor";
import {CodeEditorOptions} from "./code-editor-configs";
import {filter, take} from "rxjs/operators";

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent {
  // @ViewChild('ID', {static: true}) NAME: ElementRef | undefined;

  @Input() public options?: CodeEditorOptions;

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
  defaultOptions: MonacoEditorConstructionOptions = {
    theme: 'vs',
    readOnly: false, minimap: {enabled: false},
    value: this.typescriptCode,
  };
  modelUri?: monaco.Uri;


  constructor(private monacoLoader: MonacoEditorLoaderService) {


  }

  mergeOptions(moreOptions?: any) {
    if (!moreOptions) return this.defaultOptions;
    return {
      ...this.defaultOptions,
      ...moreOptions
    }
  }


}
