import { cn } from '$lib/utils/ui';
import Link from 'next/link';

export function LegalAgreement({ className }: React.ComponentProps<'p'>) {
	return (
		<p
			className={cn(
				'[&_a]:hover:text-primary text-xs [&_a]:underline [&_a]:underline-offset-4',
				className
			)}
		>
			By clicking continue, you agree to our <Link href='/legal/terms'>Terms of Service</Link> and{' '}
			<Link href='/legal/privacy-policy'>Privacy Policy</Link>.
		</p>
	);
}
