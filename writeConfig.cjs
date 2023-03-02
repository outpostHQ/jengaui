const paths = `./packages/hooks/tsup.config.ts
./packages/accordion/tsup.config.ts
./packages/active-zone/tsup.config.ts
./packages/alert/tsup.config.ts
./packages/alert-dialog/tsup.config.ts
./packages/avatar/tsup.config.ts
./packages/badge/tsup.config.ts
./packages/banner/tsup.config.ts
./packages/breadcrumbs/tsup.config.ts
./packages/button/tsup.config.ts
./packages/button-group/tsup.config.ts
./packages/card/tsup.config.ts
./packages/checkbox/tsup.config.ts
./packages/combo-box/tsup.config.ts
./packages/content/tsup.config.ts
./packages/copy-snippet/tsup.config.ts
./packages/core/tsup.config.ts
./packages/dialog/tsup.config.ts
./packages/file-input/tsup.config.ts
./packages/form/tsup.config.ts
./packages/input/tsup.config.ts
./packages/layout/tsup.config.ts
./packages/link/tsup.config.ts
./packages/menu/tsup.config.ts
./packages/modal/tsup.config.ts
./packages/notification/tsup.config.ts
./packages/number-input/tsup.config.ts
./packages/overlays/tsup.config.ts
./packages/password-input/tsup.config.ts
./packages/placeholder/tsup.config.ts
./packages/portal/tsup.config.ts
./packages/prism-code/tsup.config.ts
./packages/providers/tsup.config.ts
./packages/radio/tsup.config.ts
./packages/react/tsup.config.ts
./packages/result/tsup.config.ts
./packages/root/tsup.config.ts
./packages/search-input/tsup.config.ts
./packages/select/tsup.config.ts
./packages/services/tsup.config.ts
./packages/skeleton/tsup.config.ts
./packages/slider/tsup.config.ts
./packages/switch/tsup.config.ts
./packages/table/tsup.config.ts
./packages/tabs/tsup.config.ts
./packages/tag/tsup.config.ts
./packages/text-input/tsup.config.ts
./packages/textarea/tsup.config.ts
./packages/toast/tsup.config.ts
./packages/tooltip/tsup.config.ts
./packages/utils/tsup.config.ts`
  .trim()
  .split('\n')
  .map((s) => s.trim());

const PACKAGE_JSON = `./packages/hooks/package.json
./packages/accordion/package.json
./packages/active-zone/package.json
./packages/alert/package.json
./packages/alert-dialog/package.json
./packages/avatar/package.json
./packages/badge/package.json
./packages/banner/package.json
./packages/breadcrumbs/package.json
./packages/button/package.json
./packages/button-group/package.json
./packages/card/package.json
./packages/checkbox/package.json
./packages/combo-box/package.json
./packages/content/package.json
./packages/copy-snippet/package.json
./packages/core/package.json
./packages/dialog/package.json
./packages/file-input/package.json
./packages/form/package.json
./packages/input/package.json
./packages/layout/package.json
./packages/link/package.json
./packages/menu/package.json
./packages/modal/package.json
./packages/notification/package.json
./packages/number-input/package.json
./packages/overlays/package.json
./packages/password-input/package.json
./packages/placeholder/package.json
./packages/portal/package.json
./packages/prism-code/package.json
./packages/providers/package.json
./packages/radio/package.json
./packages/react/package.json
./packages/result/package.json
./packages/root/package.json
./packages/search-input/package.json
./packages/select/package.json
./packages/services/package.json
./packages/skeleton/package.json
./packages/slider/package.json
./packages/switch/package.json
./packages/table/package.json
./packages/tabs/package.json
./packages/tag/package.json
./packages/text-input/package.json
./packages/textarea/package.json
./packages/toast/package.json
./packages/tooltip/package.json
./packages/utils/package.json`
  .trim()
  .split('\n')
  .map((s) => s.trim());

const preProcess = (s = '') =>
  s.trim().replace('\n+', '\n').trim().replace('s+', '');

const preProcessCMD = (s = '') =>
  s.trim().replace('\n', '').trim().replace('s+', ' ');

const OLD_CFG = preProcess(`import { defineConfig } from 'tsup';
import { findUpSync } from 'find-up';

export default defineConfig({
  clean: true,
  format: ["cjs", "esm"],                                               
  inject: process.env.JSX ? [findUpSync('react-shim.js')!] : undefined,
  treeshake: true,
  minify: true,
  dts: true
})
`);

const NEW_CFG = preProcess(`import { defineConfig } from 'tsup';
import { findUpSync } from 'find-up';
import packageJSON from './package.json';

export default defineConfig({
  clean: true,
  format: ['cjs', 'esm'],
  inject: process.env.JSX ? [findUpSync('react-shim.js')!] : undefined,
  treeshake: true,
  minify: true,
  dts: true,
  external: [
    ...Object.keys(packageJSON['dependencies']),
    ...Object.keys(packageJSON['devDependencies']),
    ...Object.keys(packageJSON['peerDependencies']),
  ],
});
`);

const OLD_buildScript = preProcessCMD(
  'JSX=1 tsup src/index.ts --dts --minify --treeshake',
);
const NEW_buildScript = preProcessCMD(
  'JSX=1 tsup src/index.ts --config ./tsup.config.ts',
);

const path = require('path');
const fs = require('fs');
const BACKUP = 1;

for (const configPath of paths) {
  try {
    const config = preProcess(fs.readFileSync(configPath, 'utf-8'));

    // if (NEW_CFG !== config) {
    //   console.log('Different Config', configPath);
    //   continue;
    // }

    // // CREATE BACKUP FILE
    // fs.writeFileSync(configPath + `${BACKUP}.bak`, config);

    fs.writeFileSync(configPath, NEW_CFG);
  } catch (error) {
    console.error(error.message);
    console.error('Error file :', configPath);
  }
}

for (const configPath of PACKAGE_JSON) {
  try {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

    const buildScript = preProcessCMD(config['scripts']['build']);

    if (buildScript !== OLD_buildScript) {
      console.log('Different Build Script', configPath);
      continue;
    }

    config['scripts']['build'] = NEW_buildScript;

    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  } catch (error) {
    console.error(error);
    console.error('Error file :', configPath);
  }
}
