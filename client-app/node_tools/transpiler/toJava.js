"use strict";
// https://github.com/searchfe/ts2php/blob/master/src/emitter.ts
// tsc .\node_tools\transpiler\toJava.ts | node .\node_tools\transpiler\toJava.js
exports.__esModule = true;
var ts = require("typescript");
var typescript_1 = require("typescript");
var code = "\n\nconst a = <tsxNode>{''}</tsxNode>;\n\n// class A {\n//\n//     protected a:number = 1+4;\n//\n//     private static testMethod(param1:string,param2:string):string {\n//         return \"3\";\n//     }\n// }\n\n";
var sourceFile = ts.createSourceFile('temp.ts', code, ts.ScriptTarget.ESNext, false, typescript_1.ScriptKind.TSX);
// const program = ts.createProgram({
//     rootNames: [],
//     options: {}
// });
// const typeChecker = program.getTypeChecker();

var CodeBuilder = /** @class */ (function () {
    function CodeBuilder() {
        this.code = '';
    }
    CodeBuilder.prototype.println = function (line, indent) {
        if (indent === void 0) { indent = false; }
        this.print(line, indent);
        this.print('\n');
    };
    CodeBuilder.prototype.print = function (line, indent) {
        if (indent === void 0) { indent = false; }
        if (indent)
            this.code += new Array(indent);
        this.code += line;
    };
    CodeBuilder.prototype.toCode = function () {
        return this.code;
    };
    return CodeBuilder;
}());
var codeBuilder = new CodeBuilder();
var emitClassDeclaration = function (node) {
    emitModifiers(node, node.modifiers);
    codeBuilder.print('class ');
    codeBuilder.print(node.name.escapedText.toString());
    if (node.heritageClauses && node.heritageClauses.length > 0) {
        //emitList(node, node.heritageClauses);
    }
    codeBuilder.println('{');
    //emitList(node, node.members);
    node.forEachChild(visitNode);
    codeBuilder.println('}');
};
var emitMethodDeclaration = function (node) {
    emitModifiers(node, node.modifiers);
    codeBuilder.print(node.type.getText(sourceFile));
    codeBuilder.print(' ');
    codeBuilder.print(node.name.getText(sourceFile));
    codeBuilder.print('(');
    node.parameters.forEach(function (p, i) {
        codeBuilder.print(p.type.getText(sourceFile));
        codeBuilder.print(' ');
        codeBuilder.print(p.name.getText(sourceFile));
        if (i < node.parameters.length - 1)
            codeBuilder.print(',');
    });
    codeBuilder.print(')');
    codeBuilder.println('{');
    node.forEachChild(visitNode);
    codeBuilder.println("");
    codeBuilder.println('}');
};
var emitPropertyDeclaration = function (node) {
    emitModifiers(node, node.modifiers);
    codeBuilder.print(node.type.getText(sourceFile));
    codeBuilder.print(' ');
    codeBuilder.print(node.name.getText(sourceFile));
    if (node.getChildCount(sourceFile)) {
        codeBuilder.print('=');
        node.forEachChild(visitNode);
    }
    codeBuilder.println(';');
};
var emitModifiers = function (node, modifiers) {
    if (modifiers && modifiers.length) {
        modifiers.forEach(function (m, i) {
            codeBuilder.print(m.getText(sourceFile));
            codeBuilder.print(' ');
        });
    }
};
var indent = 1;
function visitNode(node) {
    console.log(new Array(indent || 1).fill(' ').join('') + ts.SyntaxKind[node.kind] + ("(" + node.kind + ")"));
    indent++;
    switch (node.kind) {
        //case ts.SyntaxKind.ExpressionStatement:
        //case ts.SyntaxKind.BinaryExpression:
        case ts.SyntaxKind.SourceFile:
        case ts.SyntaxKind.EndOfFileToken:
            {
                node.forEachChild(visitNode);
                break;
            }
        case ts.SyntaxKind.ClassDeclaration: {
            emitClassDeclaration(node);
            break;
        }
        case ts.SyntaxKind.MethodDeclaration: {
            emitMethodDeclaration(node);
            break;
        }
        case ts.SyntaxKind.PropertyDeclaration: {
            emitPropertyDeclaration(node);
            break;
        }
        case ts.SyntaxKind.ReturnStatement: {
            codeBuilder.print('return ');
            node.forEachChild(visitNode);
            break;
        }
        case ts.SyntaxKind.StringLiteral: {
            codeBuilder.print(node.getText(sourceFile));
            break;
        }
        // case ts.SyntaxKind.Identifier: {
        //     codeBuilder.print(-1,` ${node.getText(sourceFile)}`);
        //     break;
        // }
        case ts.SyntaxKind.FirstLiteralToken: {
            codeBuilder.print(node.getText(sourceFile));
            break;
        }
        case ts.SyntaxKind.PlusToken: {
            codeBuilder.print('+');
            break;
        }
        case ts.SyntaxKind.ExpressionStatement: {
            node.forEachChild(visitNode);
            break;
        }
        case ts.SyntaxKind.FirstTemplateToken: {
            node.forEachChild(visitNode);
            break;
        }
        default: {
            //codeBuilder.println(`unknown node: ${ts.SyntaxKind[node.kind]} (${node.kind})`);
            node.forEachChild(visitNode);
        }
    }
    indent--;
}
visitNode(sourceFile);
console.log(codeBuilder.toCode());
