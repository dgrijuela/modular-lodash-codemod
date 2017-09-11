function isImport(node, imported) {
  return node.type === "ImportDeclaration" && node.source.value === imported;
}

function isLodashImport(node) {
  return isImport(node, "lodash");
}

function transformImport(j) {
  console.log(j.__methods);
  return ast => {
    ast.node.source = j.literal("lodash");
    const imports = ast.value.specifiers;
    j(ast).replaceWith(buildSplitImports(j, imports));
  };
}

function buildSplitImports(j, imports) {
  return imports.map(({ imported: { name } }) => {
    return j.importDeclaration(
      [j.importDefaultSpecifier(j.identifier(name))],
      j.literal(`lodash/${name}`)
    );
  });
}

module.exports = function(fileInfo, { jscodeshift: j }, argOptions) {
  const ast = j(fileInfo.source);

  // Cache opening comments/position
  const { comments, loc } = ast.find(j.Program).get("body", 0).node;
  console.log("comments", comments);

  console.log("loc", loc);

  ast // import _ from 'lodash'
    .find(j.ImportDeclaration, isLodashImport)
    .forEach(transformImport(j));

  // Restore opening comments/position
  Object.assign(ast.find(j.Program).get("body", 0).node, { comments, loc });

  return ast.toSource({
    arrowParensAlways: true,
    quote: "single"
  });
};
