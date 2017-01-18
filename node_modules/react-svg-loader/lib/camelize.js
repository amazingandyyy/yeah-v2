"use strict";

exports.__esModule = true;
exports.hyphenToCamel = hyphenToCamel;
exports.namespaceToCamel = namespaceToCamel;
function hyphenToCamel(name) {
  return name.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });
}

function namespaceToCamel(namespace, name) {
  return namespace + name.charAt(0).toUpperCase() + name.slice(1);
}