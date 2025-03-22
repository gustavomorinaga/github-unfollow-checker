import { Input } from '$lib/components/ui/input';
import { Label } from '$lib/components/ui/label';
import { cn } from '$lib/utils/ui';

import { Search } from 'lucide-react';

type TSearchBarInputProps = Pick<React.ComponentProps<'div'>, 'className'> &
	React.ComponentProps<'input'>;

/**
 * Search bar input component.
 *
 * @returns The search bar input component.
 */
export function SearchBarInput({ className, ...props }: TSearchBarInputProps) {
	return (
		<div className={cn('relative', className)}>
			<Label htmlFor='search' aria-label='Search' className='contents'>
				<Search className='text-muted-foreground absolute top-2.5 left-2 size-4' />
				<span className='sr-only select-none'>Search</span>
			</Label>
			<Input type='search' id='search' placeholder='Search' className='pl-8' {...props} />
		</div>
	);
}
