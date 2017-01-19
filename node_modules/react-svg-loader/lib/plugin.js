'use strict';

exports.__esModule = true;

exports.default = function (babel) {
  var t = babel.types;

  var attrVisitor = {
    JSXAttribute: function JSXAttribute(path) {
      if (t.isJSXNamespacedName(path.node.name)) {
        // converts
        // <svg xmlns:xlink="asdf">
        // to
        // <svg xmlnsXlink="asdf">
        path.node.name = t.jSXIdentifier((0, _camelize.namespaceToCamel)(path.node.name.namespace.name, path.node.name.name.name));
      } else if (t.isJSXIdentifier(path.node.name)) {
        // converts
        // <tag class="blah blah1"/>
        // to
        // <tag className="blah blah1"/>
        if (path.node.name.name === 'class') {
          path.node.name.name = "className";
        }

        // converts
        // <tag style="text-align: center; width: 50px">
        // to
        // <tag style={{textAlign: 'center', width: '50px'}}>
        if (path.node.name.name === 'style') {
          (function () {
            var csso = (0, _cssToObj2.default)(path.node.value.value);
            var properties = Object.keys(csso).map(function (prop) {
              return t.objectProperty(t.identifier((0, _camelize.hyphenToCamel)(prop)), t.stringLiteral(csso[prop]));
            });
            path.node.value = t.jSXExpressionContainer(t.objectExpression(properties));
          })();
        }

        // converts
        // <svg stroke-width="5">
        // to
        // <svg strokeWidth="5">
        path.node.name.name = (0, _camelize.hyphenToCamel)(path.node.name.name);
      }
    }
  };

  // returns
  // export default class SVG extends React.Component {
  //   render() {
  //     return ${input_svg_node}
  //   }
  // }
  var getExport = function getExport(svg) {
    var className = arguments.length <= 1 || arguments[1] === undefined ? 'SVG' : arguments[1];

    return t.exportDefaultDeclaration(t.classDeclaration(t.identifier(className), t.memberExpression(t.identifier('React'), t.identifier('Component')), t.classBody([t.classMethod('method', t.identifier('render'), [], t.blockStatement([t.returnStatement(svg)]))]), []));
  };

  // converts
  // <svg>
  // to
  // <svg {...this.props}>
  // after passing through attributes visitors
  var svgVisitor = {
    JSXOpeningElement: function JSXOpeningElement(path) {
      if (path.node.name.name.toLowerCase() === 'svg') {
        // add spread props
        path.node.attributes.push(t.jSXSpreadAttribute(t.memberExpression(t.thisExpression(), t.identifier('props'))));
      }
    }
  };

  // converts
  // <svg/>
  // to
  // import React from 'react';
  // export default class SVG extends React.Component { render() { <svg/> }}
  // after passing through other visitors
  var svgExpressionVisitor = {
    ExpressionStatement: function ExpressionStatement(path) {
      if (!path.get('expression').isJSXElement()) return;
      if (path.get('expression.openingElement.name').node.name !== 'svg') return;
      path.replaceWith(getExport(path.get('expression').node));
    }
  };

  var programVisitor = {
    Program: function Program(path) {
      // add import react statement
      path.node.body.unshift(t.importDeclaration([t.importDefaultSpecifier(t.identifier('React'))], t.stringLiteral('react')));
    }
  };

  return {
    visitor: Object.assign({}, programVisitor, svgExpressionVisitor, svgVisitor, attrVisitor)
  };
};

var _cssToObj = require('./css-to-obj');

var _cssToObj2 = _interopRequireDefault(_cssToObj);

var _camelize = require('./camelize');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];