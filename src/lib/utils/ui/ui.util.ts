import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

type TCn = (...inputs: ClassValue[]) => string;

/**
 * Combines multiple class names into a single string.
 *
 * This function takes any number of class name inputs, merges them using `clsx`,
 * and then further processes the result with `twMerge` to handle Tailwind CSS class conflicts.
 *
 * @param inputs - The class names to be combined. These can be strings, arrays, or objects.
 *
 * @returns - A single string containing all the combined class names.
 */
export const cn: TCn = (...inputs) => twMerge(clsx(inputs));
