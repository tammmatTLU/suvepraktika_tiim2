export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}


export interface Element {
  id: number;
  name: string;
  position: Position;
  size: Size;
  fontSize: number;
  fontFamily: string;
  color: string;
  backgroundColor: string;
}

export interface ButtonElement extends Element{
  id: number;
  name: string;
  type: 'button';
  position: Position;
  state: boolean;
  size: Size;
  fontSize: number;
  fontFamily: string;
  color: string;
  backgroundColor: string;
  templateId: number;
}

export interface SpanElement extends Element{
  id: number;
  name: string;
  type: 'span';
  position: Position;
  size: Size;
  fontSize: number;
  fontFamily: string;
  color: string;
  backgroundColor: string;
}

export interface PageStyle {
  backgroundColor: string;
  fontFamily: string;
  fontSize: number;
  color: string;
  setForElements?: boolean;
  btnBackgroundColor: string;
  btnColor: string;
  btnFontFamily: string;
  btnFontSize: number;
  spanBackgroundColor: string;
  spanColor: string;
  spanFontFamily: string;
  spanFontSize: number;
}

export interface ButtonTemplate {
  id: number;
  name: string;
  command: string;
  roomId: number;
  roomName: string;
}