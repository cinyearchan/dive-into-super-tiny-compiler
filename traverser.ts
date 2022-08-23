import { NodeTypes, RootNode, ChildNode } from "./ast";

interface VisitorOption {
  enter(node: RootNode | ChildNode, parent: RootNode | ChildNode | undefined);
  exit(node: RootNode | ChildNode, parent: RootNode | ChildNode | undefined);
}

interface Visitor {
  Program?: VisitorOption;
  CallExpression?: VisitorOption;
  NumberLiteral?: VisitorOption;
  StringLiteral?: VisitorOption;
}

export function traverser(rootNode: RootNode, visitor: Visitor) {
  // 1. 深度优先遍历
  // 2. visitor

  function traverseArray(
    array: ChildNode[],
    parent: RootNode | ChildNode | undefined
  ) {
    array.forEach((node) => {
      traverseNode(node, parent);
    });
  }

  function traverseNode(
    node: ChildNode | RootNode,
    parent?: RootNode | ChildNode
  ) {
    const visitorObj = visitor[node.type];
    // enter
    if (visitorObj) {
      visitorObj.enter(node, parent);
    }

    switch (node.type) {
      case NodeTypes.NumberLiteral:
        // console.log("number", node);
        // traverseNode(node)
        break;
      case NodeTypes.CallExpression:
        traverseArray(node.params, node);
        break;
      case NodeTypes.Program:
        traverseArray(node.body, node);
        break;
    }

    // exit
    if (visitorObj) {
      visitorObj.exit(node, parent);
    }
  }

  traverseNode(rootNode);
}
