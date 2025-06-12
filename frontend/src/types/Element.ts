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
  state: State;
  size: Size;
  fontSize: number;
  fontFamily: string;
  color: string;
  backgroundColor: string;
}