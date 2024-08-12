export type Options = {
  /**
   * where liquid file directory path. usually this should be 'sections'.
   */
  liquidDir?: string;
};

export const getInitialOptions = (options: Options = {}): Required<Options> => {
  const { liquidDir = 'snippets' } = options;

  return {
    liquidDir,
  };
};
