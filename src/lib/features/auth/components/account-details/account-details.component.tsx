import type { Session } from 'next-auth';

import { Avatar } from '$lib/features/auth/components/avatar';

type TAccountDetailsProps = React.ComponentProps<'a'> & { session: Session };

/**
 * The `AccountDetails` component renders the user's account details.
 *
 * @returns The rendered account details component.
 */
export function AccountDetails({ session, ...props }: TAccountDetailsProps) {
	return (
		<a
			href={`https://github.com/${session.user.login}`}
			target='_blank'
			rel='noopener noreferrer'
			className='group contents'
			{...props}
		>
			<div className='flex gap-2'>
				<div className='flex'>
					<Avatar
						session={session}
						className='group-hover:ring-primary size-10 transition-[color,box-shadow] group-hover:ring-2'
					/>
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
