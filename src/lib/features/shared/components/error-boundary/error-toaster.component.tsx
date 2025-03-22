'use client';

import React from 'react';

import { toast } from '$lib/components/ui/sonner';
import { useData } from '$lib/contexts/data';

/**
 * `ErrorBoundary` component that listens for errors using the `useData` hook.
 * If an error is detected, it displays a toast notification with the error message.
 *
 * @returns This component does not render any visible output.
 */
export function ErrorBoundary() {
	const { error } = useData();

	React.useEffect(() => {
		if (error) toast.error(error.message);
	}, [error]);

	return null;
}
