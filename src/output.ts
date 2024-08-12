import { writeFile } from "fs/promises";
import { getInitialOptions, Options } from "./options";
import { resolve } from "path";
import { existsSync, mkdirSync } from "fs";

export const outputLiquidFile = (
  entryName: string,
  content: string,
  options: Options = {}
) => {
  const { liquidDir } = getInitialOptions(options);
  const entryLiquidFilePath = resolve(liquidDir, `${entryName}.liquid`);

  if (!existsSync(liquidDir)) {
    mkdirSync(liquidDir);
  }

  return writeFile(entryLiquidFilePath, content);
};
