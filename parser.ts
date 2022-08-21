import {
  Token,
  TokenTypes,
  NodeTypes,
  RootNode,
  NumberNode,
  CallExpressionNode,
} from "./type";

function createRootNode(): RootNode {
  return {
    type: NodeTypes.Root,
    body: [],
  };
}

function createNumberNode(value: string): NumberNode {
  return {
    type: NodeTypes.Number,
    value,
  };
}

function createCallExpressionNode(name: string): CallExpressionNode {
  return {
    type: NodeTypes.CallExpression,
    name,
    params: [],
  };
}

export function parser(tokens: Token[]) {
  let current = 0;
  const rootNode = createRootNode();

  function walk() {
    let token = tokens[current];

    if (token.type === TokenTypes.Number) {
      // rootNode.body.push(createNumberNode(token.value));
      current++;
      return createNumberNode(token.value);
    }

    if (token.type === TokenTypes.Paren && token.value === "(") {
      token = tokens[++current];
      const node = createCallExpressionNode(token.value);

      token = tokens[++current];
      while (!(token.type === TokenTypes.Paren && token.value === ")")) {
        node.params.push(walk());
        token = tokens[current];
      }
      current++;
      // rootNode.body.push(node);
      return node;
    }

    throw new Error(`unknown token: ${token}`);
  }

  while (current < tokens.length) {
    rootNode.body.push(walk());
  }
  
  return rootNode;
}
