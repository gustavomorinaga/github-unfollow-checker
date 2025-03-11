import { ProseLayout } from '$lib/layouts/prose';

export default function LegalLayout({ children }: React.PropsWithChildren) {
	return <ProseLayout className='mb-8'>{children}</ProseLayout>;
}
