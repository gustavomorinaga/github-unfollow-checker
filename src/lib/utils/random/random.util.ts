/**
 * Generates a random value using the browser's cryptographic API.
 *
 * @returns A cryptographically secure random value.
 *
 * @remarks
 * - This function uses the browser's cryptographic API to generate a random value.
 * - Is a recommended secure way to generate random values, instead of using `Math.random()`.
 */
export const generateRandomValue = () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const crypto = window.crypto || (window as any).msCrypto;
	const maxUint32 = 0xffffffff;

	const array = new Uint32Array(1);
	const [randomValue] = crypto.getRandomValues(array);

	return randomValue / (maxUint32 + 1);
};
