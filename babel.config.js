module.exports = {
  presets: [
    [
      "@vue/babel-preset-app",
      {
        "useBuiltIns": "usage"
      }
    ]
  ],
  plugins: [
    ["@babel/plugin-transform-runtime"],
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant'],
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
};
