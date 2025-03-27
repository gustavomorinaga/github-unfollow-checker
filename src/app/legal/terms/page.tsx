import { generateSiteMetadata } from '$lib/configs/site';
import { TermsView } from '$lib/features/legal/views/terms';

export const metadata = generateSiteMetadata({ title: 'Terms of Use' });

export default function TermsPage() {
	return <TermsView />;
}
