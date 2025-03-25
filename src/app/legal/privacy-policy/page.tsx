import { generateSiteMetadata } from '$lib/configs/site';
import { PrivacyPolicyView } from '$lib/features/legal/views/privacy-policy';

export const metadata = generateSiteMetadata({ title: 'Privacy Policy' });

export default function PrivacyPolicyPage() {
	return <PrivacyPolicyView />;
}
