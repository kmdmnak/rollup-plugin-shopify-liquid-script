
export const generateScriptFileContent = (
  entryFileName: string,
  dependencyFileNames: string[]
) => {
  const fileNames = [entryFileName, ...dependencyFileNames];
  const systemJSImportMapConfig = generateSystemJSImportMapConfig(fileNames);

  return systemJSImportMapConfig;
};

function generateSystemJSImportMapConfig(fileNames: string[]) {
  const map = fileNames.reduce((accum, fileName) => {
    accum[`./${fileName}`] = `{{ '${fileName}' | asset_url }}`;
    return accum;
  }, {} as Record<string, string>);

  const systemJsConfig = {
    map,
  };

  return `<script>SystemJS.config(${JSON.stringify(systemJsConfig)})</script>`;
}
