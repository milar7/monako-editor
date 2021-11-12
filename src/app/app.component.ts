import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'monaco';
  editorOptions = {theme: 'vs-light', language: 'javascript',readOnly: true};
  code: string= 'function x() {\n' +
    '    console.log("Hello world!");\n' +
    '}\n';
  onInit(editor:any) {
    let line = editor.getPosition();

    console.log(line);
  }
}
