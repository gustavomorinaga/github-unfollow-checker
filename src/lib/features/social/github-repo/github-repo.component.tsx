import { GitHub } from '$lib/components/icons/github';
import { Button } from '$lib/components/ui/button';
import { repoMetadata } from '$lib/configs/site';
import { cn } from '$lib/utils/ui';

/**
 * The `GitHubRepo` component renders a link to a GitHub repository.
 *
 * @param props - The props for the anchor element.
 * @param props.className - Additional class names for styling.
 *
 * @returns A link element that opens the GitHub repository in a new tab.
 */
export function GitHubRepo({ className, ...props }: React.ComponentPropsWithoutRef<'a'>) {
	const {
		owner: { username },
		repo
	} = repoMetadata;
	const repoURL = `https://github.com/${username}/${repo}`;

	return (
		<a
			href={repoURL}
			target='_blank'
			rel='noopener noreferrer'
			className={cn('contents', className)}
			{...props}
		>
			<Button size='icon' variant='ghost' aria-label='Visit GitHub Repository'>
				<GitHub />
				<span className='sr-only select-none'>Visit GitHub Repository</span>
			</Button>
		</a>
	);
}
