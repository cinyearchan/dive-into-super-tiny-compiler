import { NodeTypes, RootNode, ChildNode } from "./ast";

interface VisitorOption {
  enter()
  exit()
}

interface Visitor {
  Program?: VisitorOption
  CallExpression?: VisitorOption
  NumberLiteral?: VisitorOption
  StringLiteral?: VisitorOption
}

export function traverser(rootNode: RootNode, visitor: Visitor) {
  // 1. 深度优先遍历
  // 2. visitor

  function traverseArray(array: ChildNode[]) {
    array.forEach((node) => {
      traverseNode(node);
    });
  }

  function traverseNode(node: ChildNode | RootNode) {
    const visitorObj = visitor[node.type]
    // enter
    if (visitorObj) {
      visitorObj.enter()
    }

    switch (node.type) {
      case NodeTypes.NumberLiteral:
        console.log("number", node);
        break;
      case NodeTypes.CallExpression:
        traverseArray(node.params);
        break;
      case NodeTypes.Program:
        traverseArray(node.body);
        break;
    }
    
    // exit
    if (visitorObj) {
      visitorObj.exit()
    }
  }

  traverseNode(rootNode);

  traverseNode(rootNode);
}
