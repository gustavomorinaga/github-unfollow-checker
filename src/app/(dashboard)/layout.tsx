import { DashboardLayout as Layout } from '$lib/layouts/dashboard';

export default function DashboardLayout({ children }: React.PropsWithChildren) {
	return <Layout>{children}</Layout>;
}
