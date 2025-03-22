/**
 * A formatter for converting numbers into a more readable, compact format.
 * Uses the 'en-US' locale and displays numbers in a short compact form.
 *
 * Example:
 * - 1000 becomes "1K"
 * - 1000000 becomes "1M"
 */
const shortNumberFormatter = new Intl.NumberFormat('en-US', {
	notation: 'compact',
	compactDisplay: 'short'
});

type TAbbreviateNumber = (value: number) => string;

/**
 * Abbreviates a given number using a short number formatter.
 *
 * @param value - The number to be abbreviated.
 *
 * @returns The abbreviated number as a string.
 */
export const abbreviateNumber: TAbbreviateNumber = (value) => shortNumberFormatter.format(value);
