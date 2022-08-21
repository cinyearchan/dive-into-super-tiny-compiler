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
  Root,
  Number,
  CallExpression,
}

export interface Node {
  type: NodeTypes;
}

export type ChildNode = NumberNode | CallExpressionNode

export interface RootNode extends Node {
  body: ChildNode[];
}

export interface NumberNode extends Node {
  value: string;
}

export interface CallExpressionNode extends Node {
  name: string
  params: ChildNode[]
}
