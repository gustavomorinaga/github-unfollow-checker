import { GitHub } from '$lib/components/icons/github';
import { Button } from '$lib/components/ui/button';
import { repoMetadata } from '$lib/configs/repo';

type TGitHubRepoButtonProps = React.ComponentProps<typeof Button>;

/**
 * The `GitHubRepo` component renders a link to a GitHub repository.
 *
 * @returns A link element that opens the GitHub repository in a new tab.
 */
export function GitHubRepoButton(props: TGitHubRepoButtonProps) {
	const {
		owner: { username },
		repo
	} = repoMetadata;
	const repoURL = `https://github.com/${username}/${repo}`;

	return (
		<Button
			size='icon'
			variant='ghost'
			aria-label='Visit GitHub Repository'
			title='Visit GitHub Repository'
			asChild
			{...props}
		>
			<a href={repoURL} target='_blank' rel='noopener noreferrer'>
				<GitHub />
				<span className='sr-only select-none'>Visit GitHub Repository</span>
			</a>
		</Button>
	);
}
