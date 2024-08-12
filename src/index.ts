import { basename } from "path";
import type { OutputAsset, OutputBundle, OutputChunk, Plugin } from "rollup";
import { generateScriptFileContent } from "./content";
import { Options } from "./options";
import { outputLiquidFile } from "./output";

export const liquidImportScriptPlugin = (options: Options = {}): Plugin => {
  return {
    name: "liquid-import-script",
    async generateBundle(rollupOptions, bundle) {
      if (rollupOptions.format !== "system") {
        throw new Error("Available output format is only 'system'");
      }

      const importMap = listImportsGroupByEntries(bundle);
      const promises = Object.entries(importMap).map(
        ([entryFileName, imports]) => {
          const dependencyFileNames = imports.map((path) => basename(path));
          const scriptContent = generateScriptFileContent(
            entryFileName,
            dependencyFileNames
          );

          const entryName = entryFileName.split(".")[0];
          return outputLiquidFile(entryName, scriptContent, options);
        }
      );

      await Promise.all(promises);
    },
  };
};

function listImportsGroupByEntries(bundle: OutputBundle) {
  const entryOutputs = Object.values(bundle).filter(
    (output) => isChunkOutput(output) && output.isEntry
  ) as OutputChunk[];

  const importMap = entryOutputs.reduce((importMap, entry) => {
    importMap[entry.fileName] = entry.imports;
    return importMap;
  }, {} as Record<string, string[]>);

  return importMap;
}

function isChunkOutput(
  output: OutputAsset | OutputChunk
): output is OutputChunk {
  return output.type === "chunk";
}
