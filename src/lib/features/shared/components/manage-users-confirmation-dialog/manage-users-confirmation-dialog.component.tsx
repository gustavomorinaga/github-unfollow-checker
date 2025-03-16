import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '$lib/components/ui/alert-dialog';

type TManageUsersConfirmationDialogProps = React.ComponentProps<typeof AlertDialog> & {
	action: Readonly<'follow' | 'unfollow' | 'whitelist' | 'blacklist'>;
	onConfirm: () => void;
};

type TActionAlertDialogMap = Record<TManageUsersConfirmationDialogProps['action'], React.ReactNode>;

/**
 * `ManageUsersConfirmationDialog` component renders a confirmation dialog for managing users.
 *
 * @returns The rendered `ManageUsersConfirmationDialog` component.
 */
export function ManageUsersConfirmationDialog({
	children,
	action,
	onConfirm,
	...props
}: TManageUsersConfirmationDialogProps) {
	const actionAlertDialogMap: TActionAlertDialogMap = {
		follow: (
			<AlertDialog {...props}>
				<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure?</AlertDialogTitle>
						<AlertDialogDescription>
							Do you really want to follow these users?
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		),
		unfollow: (
			<AlertDialog {...props}>
				<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure?</AlertDialogTitle>
						<AlertDialogDescription>
							Do you really want to unfollow these users?
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		),
		whitelist: (
			<AlertDialog {...props}>
				<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure?</AlertDialogTitle>
						<AlertDialogDescription>
							Do you really want to whitelist these users?
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		),
		blacklist: (
			<AlertDialog {...props}>
				<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure?</AlertDialogTitle>
						<AlertDialogDescription>
							Do you really want to remove these users from the whitelist?
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		)
	};

	return actionAlertDialogMap[action];
}
