import { Hero } from '$lib/features/marketing/components/hero';
import { Features } from '$lib/features/marketing/components/features';
import { FAQ } from '$lib/features/marketing/components/faq';

export function HomeView() {
	return (
		<>
			<Hero />
			<Features />
			<FAQ />
		</>
	);
}
