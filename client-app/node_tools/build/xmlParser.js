/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

// UNUSED EXPORTS: XmlParser

;// CONCATENATED MODULE: ./node_modules/tslib/tslib.es6.js
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __spreadArray(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

;// CONCATENATED MODULE: ./engine/misc/xml/xmlELements.ts

var XmlNode = (function () {
    function XmlNode() {
        this.attributes = {};
        this.children = [];
    }
    XmlNode.visitAll = function (element, onVisited) {
        if (onVisited(element))
            return;
        for (var _i = 0, _a = element.children; _i < _a.length; _i++) {
            var c = _a[_i];
            if (!(c instanceof XmlNode))
                continue;
            this.visitAll(c, onVisited);
        }
    };
    XmlNode.prototype.getElementById = function (id) {
        var el;
        XmlNode.visitAll(this, function (current) {
            if (current.attributes.id === id) {
                el = current;
                return true;
            }
            return false;
        });
        return el;
    };
    XmlNode.prototype.getChildNodes = function () {
        return this.children.filter(function (it) { return it instanceof XmlNode; });
    };
    XmlNode.prototype.getElementsByTagName = function (tagName) {
        var arr = [];
        XmlNode.visitAll(this, function (current) {
            if (current.tagName === tagName)
                arr.push(current);
            return false;
        });
        return arr;
    };
    XmlNode.prototype.getFirstElementByTagName = function (tagName) {
        var result;
        XmlNode.visitAll(this, function (current) {
            if (current.tagName === tagName) {
                result = current;
                return true;
            }
            return false;
        });
        return result;
    };
    XmlNode.prototype.querySelector = function (path) {
        return this.getFirstElementByTagName(path);
    };
    XmlNode.prototype.querySelectorAll = function (path) {
        return this.getElementsByTagName(path);
    };
    XmlNode.prototype.getAttribute = function (name) {
        return this.attributes[name];
    };
    XmlNode.prototype.getAttributes = function () {
        return __assign({}, this.attributes);
    };
    XmlNode.prototype.setAttribute = function (name, value) {
        this.attributes[name] = value.toString();
    };
    XmlNode.prototype.toJSON = function () {
        var res = { tagName: this.tagName, attributes: this.attributes, children: [] };
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var c = _a[_i];
            if (c instanceof XmlNode)
                res.children.push(c.toJSON());
            else
                res.children.push({ data: c.data });
        }
        return res;
    };
    XmlNode.prototype.fromJSON = function (obj) {
        this.tagName = obj.tagName;
        this.attributes = obj.attributes;
        this.children = [];
        for (var _i = 0, _a = obj.children; _i < _a.length; _i++) {
            var c = _a[_i];
            if (c.data !== undefined)
                this.children.push(c);
            else {
                var cNode = c;
                var childNode = new XmlNode();
                childNode.fromJSON(cNode);
                this.children.push(childNode);
                childNode.parent = this;
            }
        }
    };
    XmlNode.prototype.clone = function () {
        var node = new XmlNode();
        node.fromJSON(this.toJSON());
        return node;
    };
    return XmlNode;
}());

var XmlDocument = (function (_super) {
    __extends(XmlDocument, _super);
    function XmlDocument() {
        return _super.call(this) || this;
    }
    XmlDocument.create = function (desc) {
        var doc = new XmlDocument();
        doc.fromJSON(desc);
        return doc;
    };
    return XmlDocument;
}(XmlNode));


;// CONCATENATED MODULE: ./engine/misc/xml/xmlParser.ts

var XmlParser = (function () {
    function XmlParser(text) {
        this.tree = new XmlNode();
        this.errors = [];
        this.preserveWhitespace = false;
        this.lowerCase = false;
        this.patTag = /([^<]*?)<([^>]+)>/g;
        this.patSpecialTag = /^\s*([!?])/;
        this.patPITag = /^\s*\?/;
        this.patStandardTag = /^\s*(\/?)([\w\-:.]+)\s*([\s\S]*)$/;
        this.patSelfClosing = /\/\s*$/;
        this.patAttrib = new RegExp("([\\w\\-:.]+)\\s*=\\s*([\"\'])([^\\2]*?)\\2", "g");
        this.patPINode = /^\s*\?\s*([\w\-:]+)\s*(.*)$/;
        this.patNextClose = /([^>]*?)>/g;
        this.patCommentTag = /^\s*!--/;
        this.patEndComment = /--$/;
        this.patDTDTag = /^\s*!DOCTYPE/;
        this.patInlineDTDNode = /^\s*!DOCTYPE\s+([\w\-:]+)/;
        this.patCDATATag = /^\s*!\s*\[\s*CDATA/;
        this.patEndCDATA = /]]$/;
        this.patCDATANode = /^\s*!\s*\[\s*CDATA\s*\[([^]*)]]/;
        this.text = text;
        if (this.text) {
            this.parse();
            this.afterParsed();
        }
    }
    XmlParser.getError = function (error) {
        var text = '';
        if (!error)
            return '';
        text = 'Error';
        if (error.code)
            text += ' ' + error.code;
        text += ': ' + error.key;
        if (error.line)
            text += ' on line ' + error.line;
        if (error.text)
            text += ': ' + error.text;
        return text;
    };
    XmlParser.prototype.getTree = function () {
        return this.tree;
    };
    XmlParser.prototype.asString = function () {
        return this.stringifyNode(this.tree, 1);
    };
    XmlParser.prototype.stringifyNode = function (node, deepness) {
        var intend = new Array(deepness).fill('').join('    ');
        if (node.data !== undefined)
            return "" + intend + XmlUtils.encodeEntities(node.data);
        else {
            var n = node;
            var result = '';
            if (n.children.length === 0)
                return intend + "<" + n.tagName + this.stringifyAttributes(n.attributes) + "/>";
            result += intend + "<" + n.tagName + this.stringifyAttributes(n.attributes) + ">\n";
            deepness++;
            for (var _i = 0, _a = n.children; _i < _a.length; _i++) {
                var c = _a[_i];
                result += this.stringifyNode(c, deepness) + '\n';
            }
            result += intend + "</" + n.tagName + ">";
            return result;
        }
    };
    XmlParser.prototype.stringifyAttributes = function (attr) {
        var res = '';
        Object.keys(attr).forEach(function (key) {
            res += " " + key + "=\"" + attr[key] + "\"";
        });
        return res;
    };
    XmlParser.prototype.parse = function (branch, name) {
        if (!branch)
            branch = this.tree;
        if (!name)
            name = '';
        branch.tagName = name;
        var foundClosing = false;
        var matches = null;
        while (matches = this.patTag.exec(this.text)) {
            var before = matches[1];
            var tag = matches[2];
            if (before.match(/\S/)) {
                var textNode = {
                    data: !this.preserveWhitespace ? XmlUtils.trim(XmlUtils.decodeEntities(before)) : XmlUtils.decodeEntities(before)
                };
                branch.children.push(textNode);
            }
            if (tag.match(this.patSpecialTag)) {
                if (tag.match(this.patPITag))
                    tag = this.parsePINode(tag);
                else if (tag.match(this.patCommentTag))
                    tag = this.parseCommentNode(tag);
                else if (tag.match(this.patDTDTag))
                    tag = this.parseDTDNode(tag);
                else if (tag.match(this.patCDATATag)) {
                    tag = this.parseCDATANode(tag);
                    var textNode = {
                        data: !this.preserveWhitespace ? XmlUtils.trim(XmlUtils.decodeEntities(tag)) : XmlUtils.decodeEntities(tag)
                    };
                    branch.children.push(textNode);
                }
                else {
                    this.throwParseError("Malformed special tag", tag);
                    break;
                }
                if (tag == null)
                    break;
            }
            else {
                matches = tag.match(this.patStandardTag);
                if (!matches) {
                    this.throwParseError("Malformed tag", tag);
                }
                var closing = matches[1];
                var nodeName = this.lowerCase ? matches[2].toLowerCase() : matches[2];
                var attribsRaw = matches[3];
                if (closing) {
                    if (nodeName === (name || '')) {
                        foundClosing = true;
                        break;
                    }
                    else {
                        this.throwParseError("Mismatched closing tag (expected </" + name + ">)", tag);
                    }
                }
                else {
                    var selfClosing = !!attribsRaw.match(this.patSelfClosing);
                    var leaf = new XmlNode();
                    leaf.tagName = nodeName;
                    this.patAttrib.lastIndex = 0;
                    while (matches = this.patAttrib.exec(attribsRaw)) {
                        var key = this.lowerCase ? matches[1].toLowerCase() : matches[1];
                        leaf.attributes[key] = XmlUtils.decodeEntities(matches[3]);
                    }
                    if (!selfClosing) {
                        this.parse(leaf, nodeName);
                        if (this.error())
                            break;
                    }
                    branch.children.push(leaf);
                    if (this.error() || (branch === this.tree))
                        break;
                }
            }
        }
        if (name && !foundClosing) {
            this.throwParseError("Missing closing tag (expected </" + name + ">)", name);
        }
    };
    XmlParser.prototype.afterParsed = function () {
        this.tree = this.tree.children[0];
    };
    XmlParser.prototype.throwParseError = function (key, tag) {
        var parsedSource = this.text.substring(0, this.patTag.lastIndex);
        var eolMatch = parsedSource.match(/\n/g);
        var lineNum = (eolMatch ? eolMatch.length : 0) + 1;
        lineNum -= tag.match(/\n/) ? tag.match(/\n/g).length : 0;
        this.errors.push({
            key: key,
            text: "<" + tag + ">",
            line: lineNum
        });
        throw new Error(this.getLastError());
    };
    XmlParser.prototype.error = function () {
        return this.errors.length;
    };
    XmlParser.prototype.getLastError = function () {
        if (!this.error())
            return '';
        return XmlParser.getError(this.errors[this.errors.length - 1]);
    };
    XmlParser.prototype.parsePINode = function (tag) {
        if (!tag.match(this.patPINode)) {
            this.throwParseError("Malformed processor instruction", tag);
        }
        return tag;
    };
    XmlParser.prototype.parseCommentNode = function (tag) {
        var matches = null;
        this.patNextClose.lastIndex = this.patTag.lastIndex;
        while (!tag.match(this.patEndComment)) {
            matches = this.patNextClose.exec(this.text);
            if (matches) {
                tag += '>' + matches[1];
            }
            else {
                this.throwParseError("Unclosed comment tag", tag);
            }
        }
        this.patTag.lastIndex = this.patNextClose.lastIndex;
        return tag;
    };
    XmlParser.prototype.parseDTDNode = function (tag) {
        if (tag.match(this.patInlineDTDNode)) {
            this.patNextClose.lastIndex = this.patTag.lastIndex;
            if (tag.indexOf('[') > -1) {
                var matches = null;
                while (!tag.match(/]/)) {
                    matches = this.patNextClose.exec(this.text);
                    if (matches) {
                        tag += '>' + matches[1];
                    }
                    else {
                        this.throwParseError("Unclosed DTD tag", tag);
                    }
                }
                this.patTag.lastIndex = this.patNextClose.lastIndex;
            }
        }
        else {
            this.throwParseError("Malformed DTD tag", tag);
        }
        return tag;
    };
    XmlParser.prototype.parseCDATANode = function (tag) {
        var matches = null;
        this.patNextClose.lastIndex = this.patTag.lastIndex;
        while (!tag.match(this.patEndCDATA)) {
            matches = this.patNextClose.exec(this.text);
            if (matches) {
                tag += '>' + matches[1];
            }
            else {
                this.throwParseError("Unclosed CDATA tag", tag);
            }
        }
        this.patTag.lastIndex = this.patNextClose.lastIndex;
        matches = tag.match(this.patCDATANode);
        if (matches) {
            return matches[1];
        }
        else {
            this.throwParseError("Malformed CDATA tag", tag);
        }
    };
    return XmlParser;
}());

var XmlUtils;
(function (XmlUtils) {
    XmlUtils.trim = function (text) {
        if (!text)
            return '';
        text = text.replace(/^\s+/, "");
        text = text.replace(/\s+$/, "");
        return text;
    };
    XmlUtils.encodeEntities = function (text) {
        if (!text)
            return '';
        text = text.replace(/&/g, "&amp;");
        text = text.replace(/</g, "&lt;");
        text = text.replace(/>/g, "&gt;");
        return text;
    };
    XmlUtils.decodeEntities = function (text) {
        if (!text)
            return '';
        if (text.match(/&/)) {
            text = text.replace(/&lt;/g, "<");
            text = text.replace(/&gt;/g, ">");
            text = text.replace(/&quot;/g, '"');
            text = text.replace(/&apos;/g, "'");
            text = text.replace(/&amp;/g, "&");
        }
        return text;
    };
})(XmlUtils || (XmlUtils = {}));
if (typeof exports !== 'undefined') {
    exports.XmlParser = XmlParser;
}

/******/ })()
;