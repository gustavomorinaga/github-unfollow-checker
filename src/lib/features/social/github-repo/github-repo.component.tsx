import { GitHub } from '$lib/components/icons/github';
import { Button } from '$lib/components/ui/button';
import { repoMetadata } from '$lib/configs/site';

export function GitHubRepo() {
	const { owner, repo } = repoMetadata;
	const repoURL = `https://github.com/${owner}/${repo}`;

	return (
		<a href={repoURL} target='_blank' rel='noopener noreferrer' className='contents'>
			<Button size='icon' variant='ghost' aria-label='Visit GitHub Repository'>
				<GitHub />
				<span className='sr-only select-none'>Visit GitHub Repository</span>
			</Button>
		</a>
	);
}
