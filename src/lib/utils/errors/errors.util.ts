/**
 * Catches errors from a promise and returns a tuple with either the error or the resolved value.
 *
 * @template T - The type of the resolved value of the promise.
 * @param promise - The promise to catch errors from.
 * @returns A promise that resolves to a tuple where the first element is either `undefined` (if the promise resolves) or an `Error` (if the promise rejects), and the second element is the resolved value of the promise (if it resolves).
 */
export async function catchError<T = unknown>(
	promise: Promise<T>
): Promise<[undefined, T] | [Error]> {
	return promise
		.then((data) => [undefined, data] as [undefined, T])
		.catch((error) => [error as Error]);
}
