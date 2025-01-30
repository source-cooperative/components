import js from '@eslint/js'
import globals from 'globals'
import { sharedJsRules } from '../../eslint.config.mjs'

export default [{
  ...js.configs.recommended,
  files: ['**/*.{js,mjs,cjs}'],
  languageOptions: {
    globals: globals.node,
  },
  rules: {
    ...js.configs.recommended.rules,
    ...sharedJsRules,
  },
}]
