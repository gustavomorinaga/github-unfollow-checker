import { auth } from '$lib/auth';
import { Avatar } from '$lib/features/auth/components/avatar';

export async function AccountDetails() {
	const session = await auth();

	if (!session) return null;

	return (
		<a
			href={`https://github.com/${session.user.login}`}
			target='_blank'
			rel='noopener noreferrer'
			className='group contents'
		>
			<div className='flex gap-2'>
				<div className='flex'>
					<Avatar className='group-hover:ring-primary size-10 transition-[color,box-shadow] group-hover:ring-2' />
				</div>

				<div className='flex flex-col'>
					<span className='line-clamp-1 text-sm font-medium'>{session.user.name}</span>
					<div className='flex items-center gap-2'>
						<span className='text-muted-foreground group-hover:text-primary line-clamp-1 text-xs underline-offset-2 transition-colors group-hover:underline'>
							{`@${session.user.login}`}
						</span>
					</div>
				</div>
			</div>
		</a>
	);
}
