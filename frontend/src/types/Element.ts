export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface State {
  on: boolean;
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
  state: State;
  size: Size;
  fontSize: number;
  fontFamily: string;
  color: string;
  backgroundColor: string;
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