module.exports = {
  extends: 'stylelint-config-standard',
  rules: {
    'block-no-empty': true,
    // 'declaration-block-no-duplicate-custom-properties':true,
    'comment-empty-line-before': [
      'always',
      {
        ignore: ['stylelint-commands', 'after-comment']
      }
    ],
    indentation: [2],
    'max-empty-lines': 2,
    'unit-case': null,
    // "block-no-empty": null,
    // "color-no-invalid-hex": true,
    // "comment-empty-line-before": ["always", {
    //   "ignore": ["stylelint-commands", "after-comment"]
    // }],
    // "declaration-colon-space-after": "always",
    // "indentation": ["tab", {
    //   "except": ["value"]
    // }],
    // "max-empty-lines": 2,
    // "rule-empty-line-before": ["always", {
    //   "except": ["first-nested"],
    //   "ignore": ["after-comment"]
    // }],
    // "unit-allowed-list": ["em", "rem", "%", "s", "px", "PX"]

  }
}