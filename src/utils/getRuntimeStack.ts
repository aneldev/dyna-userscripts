import {dynaError} from "dyna-error";

export const getRuntimeStack = (): string[] => {
  const stack: string[] = [];

  try {
    throw new Error('Getting runtime stack');
  }
  catch (e) {
    const error = dynaError(e);
    const stackString = error.stack as string;
    const stackLines =
      stackString
        .split('\n')
        .slice(1)
        .map(line => line.trim())
        .filter(Boolean);
    stack.push(...stackLines);
  }

  return stack;
};
