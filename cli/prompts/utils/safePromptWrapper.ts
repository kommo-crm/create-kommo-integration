import { ExitPromptError } from '@inquirer/core';

export async function safePromptWrapper<T>(prompt: T): Promise<Awaited<T>> {
  try {
    const answers = await prompt;

    return answers;
  } catch (error) {
    if (error instanceof ExitPromptError) {
      process.exit(0);
    }

    throw error;
  }
}
