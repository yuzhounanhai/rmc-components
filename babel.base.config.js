function needESModule(env) {
  if (env === 'esm') {
    return true;
  }
  return false;
}

function getModules(env) {
  if (env === 'esm') {
    return false;
  }
  if (env) {
    return env;
  }
  return "commonjs";
}

module.exports = (env) => ({
  presets: [
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        targets: needESModule(env) ? {
          esmodules: true,
        } : {
          esmodules: false,
          browsers: ["last 2 versions", "Firefox ESR", "> 1%", "ie >= 11"],
        },
        modules: getModules(env),
      }
    ]
  ],
  plugins: [
    [
      "@babel/plugin-transform-typescript",
      {
        isTSX: true
      }
    ],
    "@babel/plugin-transform-object-assign",
    "@babel/plugin-transform-property-literals",
    "@babel/plugin-transform-member-expression-literals",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-proposal-class-properties",
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true
      }
    ],
  ],
});
