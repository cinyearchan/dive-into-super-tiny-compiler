export interface Token {
  type: TokenTypes;
  value: string;
}

export enum TokenTypes {
  Paren,
  Name,
  Number,
}

export enum NodeTypes {
  NumberLiteral = "NumberLiteral",
  Program = "Program",
  StringLiteral = "StringLiteral",
  CallExpression = "CallExpression",
}

export interface Node {
  type: NodeTypes;
}

export type ChildNode =
  | NumberLiteralNode
  | CallExpressionNode
  | StringLiteralNode;

export interface RootNode extends Node {
  type: NodeTypes.Program;
  body: ChildNode[];
}

export interface NumberLiteralNode extends Node {
  type: NodeTypes.NumberLiteral;
  value: string;
}

export interface StringLiteralNode extends Node {
  value: string;
  type: NodeTypes.StringLiteral;
}

export interface CallExpressionNode extends Node {
  type: NodeTypes.CallExpression;
  name: string;
  params: ChildNode[];
}
