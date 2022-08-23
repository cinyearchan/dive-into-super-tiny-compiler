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
          callArr.push("program-enter");
        },
        exit(node, parent) {
          callArr.push("program-exit");
        },
      },

      CallExpression: {
        enter(node, parent) {
          callArr.push("callExpression-enter");
        },
        exit(node, parent) {
          callArr.push("callExpression-exit");
        },
      },

      NumberLiteral: {
        enter(node, parent) {
          callArr.push("numberLiteral-enter");
        },
        exit(node, parent) {
          callArr.push("numberLiteral-exit");
        },
      },
    };

    traverser(ast, visitor);

    expect(callArr).toEqual([
      "program-enter",
      "callExpression-enter",
      "numberLiteral-enter",
      "numberLiteral-exit",
      "callExpression-enter",
      "numberLiteral-enter",
      "numberLiteral-exit",
      "numberLiteral-enter",
      "numberLiteral-exit",
      "callExpression-exit",
      "callExpression-exit",
      "program-exit",
    ]);
  });
});
