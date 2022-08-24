import { NodeTypes, RootNode, ChildNode, CallExpressionNode } from "./ast";

type ParentNode = RootNode | CallExpressionNode | undefined;
type MethodFn = (node: RootNode | ChildNode, parent: ParentNode) => void;

interface VisitorOption {
  enter: MethodFn;
  exit?: MethodFn;
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

  function traverseArray(array: ChildNode[], parent: ParentNode) {
    array.forEach((node) => {
      traverseNode(node, parent);
    });
  }

  function traverseNode(node: ChildNode | RootNode, parent?: ParentNode) {
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
    if (visitorObj && visitorObj.exit) {
      visitorObj.exit(node, parent);
    }
  }

  traverseNode(rootNode);
}
