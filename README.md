# Shopify Liquid Import Scripts Plugin for Rollup

A Rollup plugin that generates Liquid templates for importing JavaScript files, with support for Shopify Liquid and custom SystemJS import mapping.

## Features

- Generates Liquid templates to import JavaScript files into your Shopify store.
- Configures SystemJS import mappings for use with Shopify Liquid.
- Allows customization of the assets directory and Liquid template directory.

## Installation

To install the plugin, use npm, yarn, or pnpm:

```bash
npm install --save-dev liquid-import-script-plugin
```

or

```bash
yarn add --dev liquid-import-script-plugin
```

or

```bash
pnpm add --save-dev liquid-import-script-plugin
```

## Usage

In your `rollup.config.js`, include the plugin in the `plugins` array and specify your options as needed:

```javascript
import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { globSync } from 'glob';
import liquidImportScriptPlugin from 'liquid-import-script-plugin';

const entryPoints = globSync("./src/entrypoints/**/*");

export default defineConfig({
  input: entryPoints,
  output: {
    dir: "assets",
    format: "system", // Ensure the format is set to 'system'
    manualChunks: {
      stencil: ["@stencil/core"],
    },
  },
  treeshake: true,
  plugins: [
    resolve({ extensions: [".mjs", ".js", ".json", ".node", ".tsx", ".ts"] }),
    commonjs(),
    liquidImportScriptPlugin(),
  ],
});
```

### Important Notes

- **Output Format**: The Rollup output format **must** be set to `'system'`. This is necessary to ensure that the generated Liquid templates correctly map the SystemJS imports for use in Shopify.
- **SystemJS Loader**: The generated Liquid templates require SystemJS to load the JavaScript modules. Include the following script tag in your Shopify theme:

  ```html
  <script src="https://cdn.jsdelivr.net/npm/systemjs@6.15.1/dist/system.min.js"></script>
  ```

### Options

The plugin accepts the following options:

```typescript
export type Options = {
  /**
   * The directory path where assets are located. Usually this should be 'assets'.
   * @default 'assets'
   */
  assetsDir?: string;

  /**
   * The directory path where Liquid files should be generated. Usually this should be 'sections'.
   * @default 'sections'
   */
  liquidDir?: string;
};
```

- **`assetsDir`**: Specifies the directory where the generated assets will be placed. By default, this is set to `"assets"`.
- **`liquidDir`**: Specifies the directory where the Liquid templates will be generated. By default, this is set to `"sections"`.

### Output Example

The generated Liquid section files will include SystemJS configuration in the following format:

```liquid
<script>SystemJS.config({"map":{"./entry-1.js":"{{ 'entry-1.js' | asset_url }}","./stencil-BcHQo1kZ.js":"{{ 'stencil-BcHQo1kZ.js' | asset_url }}","./module-1-Ctc87KA9.js":"{{ 'module-1-Ctc87KA9.js' | asset_url }}"}})</script>
```

This output ensures that your JavaScript files are correctly imported and mapped using SystemJS in your Shopify store.

## Example

Here is an updated example configuration in `rollup.config.js`:

```javascript
import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { globSync } from 'glob';
import liquidImportScriptPlugin from 'liquid-import-script-plugin';

const entryPoints = globSync("./src/entrypoints/**/*");

export default defineConfig({
  input: entryPoints,
  output: {
    dir: "assets",
    format: "system",
    manualChunks: {
      stencil: ["@stencil/core"],
    },
  },
  treeshake: true,
  plugins: [
    resolve({ extensions: [".mjs", ".js", ".json", ".node", ".tsx", ".ts"] }),
    commonjs(),
    liquidImportScriptPlugin({
      assetsDir: "assets",
      liquidDir: 'sections',
    }),
  ],
});
```

In this example:

- The assets will be output to the `"assets"` directory.
- The Liquid templates will be generated in the `"sections"` directory.
- The output format is set to `'system'` to ensure compatibility with SystemJS.
- The `manualChunks` option is used to separate `@stencil/core` into its own chunk.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
