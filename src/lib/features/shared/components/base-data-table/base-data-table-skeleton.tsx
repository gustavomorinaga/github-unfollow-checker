import { Skeleton } from '$lib/components/ui/skeleton';
import { cn } from '$lib/utils/ui';

type TBaseDataTableSkeletonProps = React.ComponentProps<'div'>;

/**
 * The `BaseDataTableSkeleton` component renders a skeleton for a data table.
 *
 * @returns The rendered `BaseDataTableSkeleton` component.
 */
export function BaseDataTableSkeleton({ className, ...props }: TBaseDataTableSkeletonProps) {
	return (
		<div className={cn('flex flex-col gap-4 px-4 py-4 md:px-0', className)} {...props}>
			<Skeleton className='ml-auto h-9 w-full md:max-w-sm' />
			<Skeleton className='h-36' />
		</div>
	);
}
