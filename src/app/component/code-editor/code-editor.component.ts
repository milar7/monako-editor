import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements OnInit {
  // @ViewChild('ID', {static: true}) NAME: ElementRef | undefined;
  editorOptions = {theme: 'vs-light', language: 'javascript',readOnly: true};
  code: string= 'function x() {\n' +
    '    console.log("Hello world!");\n' +
    '}\n';
  onInit(editor:any) {
    let line = editor.getPosition();

    console.log("init event",line);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
