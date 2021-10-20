/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
!function() {
var exports = __webpack_exports__;
var __webpack_unused_export__;

var ts = require('typescript');
var stringAsClearedArray = function (content) {
    return content.
        split('\r').join('\n').
        split('\n').
        filter(function (it) { return !!it.trim(); }).
        filter(function (it) { return !it.startsWith('//'); });
};
var engineTransformer = function (context) {
    return function (rootNode) {
        function visit(node) {
            if (node.kind === ts.SyntaxKind.TaggedTemplateExpression) {
                var _a = node.getChildren(), tag = _a[0], template = _a[1];
                if (tag.getText() === 'MACRO_GL_COMPRESS') {
                    var text = template.getText().slice(1, -1);
                    text = stringAsClearedArray(text).map(function (it) { return it.trim(); }).filter(function (it) { return !!it; }).join('\n');
                    return ts.createStringLiteral(text);
                }
            }
            return ts.visitEachChild(node, visit, context);
        }
        return ts.visitNode(rootNode, visit);
    };
};
if (true) {
    module.exports.engineTransformer = engineTransformer;
}

}();
/******/ })()
;
