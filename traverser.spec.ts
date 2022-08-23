import { describe, expect, test } from "vitest";
import { NodeTypes, RootNode } from "./ast";
import { traverser } from "./traverser";

describe("test ast", () => {
  test("traverser", () => {
    const ast: RootNode = {
      type: NodeTypes.Program,
      body: [
        {
          type: NodeTypes.CallExpression,
          name: "add",
          params: [
            {
              type: NodeTypes.NumberLiteral,
              value: "2",
            },
            {
              type: NodeTypes.CallExpression,
              name: "subtract",
              params: [
                {
                  type: NodeTypes.NumberLiteral,
                  value: "4",
                },
                {
                  type: NodeTypes.NumberLiteral,
                  value: "2",
                },
              ],
            },
          ],
        },
      ],
    };

    const callArr: any = [];
    const visitor: any = {
      Program: {
        enter(node, parent) {
          callArr.push(["program-enter", node.type, ""]);
        },
        exit(node, parent) {
          callArr.push(["program-exit", node.type, ""]);
        },
      },

      CallExpression: {
        enter(node, parent) {
          callArr.push(["callExpression-enter", node.type, parent.type]);
        },
        exit(node, parent) {
          callArr.push(["callExpression-exit", node.type, parent.type]);
        },
      },

      NumberLiteral: {
        enter(node, parent) {
          callArr.push(["numberLiteral-enter", node.type, parent.type]);
        },
        exit(node, parent) {
          callArr.push(["numberLiteral-exit", node.type, parent.type]);
        },
      },
    };

    traverser(ast, visitor);

    expect(callArr).toEqual([
      ["program-enter", NodeTypes.Program, ""],
      ["callExpression-enter", NodeTypes.CallExpression, NodeTypes.Program],
      [
        "numberLiteral-enter",
        NodeTypes.NumberLiteral,
        NodeTypes.CallExpression,
      ],
      ["numberLiteral-exit", NodeTypes.NumberLiteral, NodeTypes.CallExpression],
      [
        "callExpression-enter",
        NodeTypes.CallExpression,
        NodeTypes.CallExpression,
      ],
      [
        "numberLiteral-enter",
        NodeTypes.NumberLiteral,
        NodeTypes.CallExpression,
      ],
      ["numberLiteral-exit", NodeTypes.NumberLiteral, NodeTypes.CallExpression],
      [
        "numberLiteral-enter",
        NodeTypes.NumberLiteral,
        NodeTypes.CallExpression,
      ],
      ["numberLiteral-exit", NodeTypes.NumberLiteral, NodeTypes.CallExpression],
      [
        "callExpression-exit",
        NodeTypes.CallExpression,
        NodeTypes.CallExpression,
      ],
      ["callExpression-exit", NodeTypes.CallExpression, NodeTypes.Program],
      ["program-exit", NodeTypes.Program, ""],
    ]);
  });
});
