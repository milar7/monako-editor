export enum CodeEditorLanguageType {
  csharp = "csharp",
  R = 'r',
  python = "python",
  matlab = "matlab"
}

export enum CodeEditorMiniMap {
  off = 0,
  on = 1
}

export enum CodeEditorTheme {
  light = "vs",
  dark = "vs-dark",
  highContrastDark = "hc-black"
}


export class CodeEditorOptions {

  public language?: CodeEditorLanguageType;
  public minimap?: CodeEditorMiniMap;//todo
  public theme?: CodeEditorTheme;

}

