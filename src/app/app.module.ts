import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AppComponent } from './app.component';

import { CodeEditorComponent } from './component/code-editor/code-editor.component';
import { EditorUsageComponent } from './component/editor-usage/editor-usage.component';
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    CodeEditorComponent,
    EditorUsageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MonacoEditorModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
