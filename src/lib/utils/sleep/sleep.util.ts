type TSleep = (ms: number) => Promise<void>;

/**
 * Sleeps for a specified amount of time.
 * @param ms - The number of milliseconds to sleep.
 * @returns A promise that resolves after the specified time has elapsed.
 */
export const sleep: TSleep = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
