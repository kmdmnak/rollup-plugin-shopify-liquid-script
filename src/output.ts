import { existsSync, mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import { resolve } from "path";
import { getInitialOptions, Options } from "./options";

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
