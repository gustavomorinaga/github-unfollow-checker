import { ProseLayout } from '$lib/layouts/prose';

export default function LegalLayout({ children }: React.PropsWithChildren) {
	return <ProseLayout className='mx-auto mb-8 px-4 md:px-0'>{children}</ProseLayout>;
}
