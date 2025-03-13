import { GitHub } from '$lib/components/icons/github';
import { Button } from '$lib/components/ui/button';
import { repoMetadata } from '$lib/configs/site';
import { cn } from '$lib/utils/ui';

type TGitHubRepoButtonProps = React.ComponentPropsWithoutRef<'a'>;

/**
 * The `GitHubRepo` component renders a link to a GitHub repository.
 *
 * @returns A link element that opens the GitHub repository in a new tab.
 */
export function GitHubRepoButton({ className, ...props }: TGitHubRepoButtonProps) {
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
