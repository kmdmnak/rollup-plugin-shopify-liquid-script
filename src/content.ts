export const generateScriptFileContent = (
  entryFileName: string,
  dependencyFileNames: string[]
) => {
  const fileNames = [entryFileName, ...dependencyFileNames];
  const systemJSImportMapConfig = generateSystemJSImportMapConfig(fileNames);
  const entryScriptTag = generateEntryScriptTag(entryFileName);

  return [systemJSImportMapConfig, entryScriptTag].join('\n');
};

function generateSystemJSImportMapConfig(fileNames: string[]) {
  const imports = fileNames.reduce(
    (accum, fileName) => {
      accum[`./${fileName}`] = `{{ '${fileName}' | asset_url }}`;
      return accum;
    },
    {} as Record<string, string>
  );

  const systemJsConfig = {
    imports,
  };

  return `<script type="systemjs-importmap">${JSON.stringify(systemJsConfig)}</script>`;
}

function generateEntryScriptTag(entryFileName: string) {
  return `<script src='{{ '${entryFileName}' | asset_url }}}'></script>`;
}
