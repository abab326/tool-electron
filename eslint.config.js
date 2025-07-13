// eslint.config.js
import vuePlugin from 'eslint-plugin-vue'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import prettierPlugin from 'eslint-plugin-prettier/recommended'
import globals from 'globals'

export default [
  // 全局配置
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021
      }
    }
  },

  // Vue 插件配置
  ...vuePlugin.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    },
    plugins: {
      vue: vuePlugin
    },
    rules: {
      'vue/multi-word-component-names': 'off'
    }
  },

  // TypeScript 插件配置
  {
    plugins: {
      '@typescript-eslint': tsPlugin
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface']
    }
  },

  // Prettier 集成
  prettierPlugin,
  {
    rules: {
      'prettier/prettier': 'warn'
    }
  },
  // 全局呼略
  {
    ignores: ['dist', 'node_modules', 'dist-electron']
  }
]
