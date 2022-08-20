export interface Token {
  type: TokenTypes;
  value: string;
}

export enum TokenTypes {
  Paren,
  Name,
  Number,
}
