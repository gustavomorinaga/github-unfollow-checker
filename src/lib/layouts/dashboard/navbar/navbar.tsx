'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle
} from '$lib/components/ui/navigation-menu';
import { cn } from '$lib/utils/ui';

type TMenuItem = Pick<React.ComponentProps<typeof Link>, 'title' | 'aria-current'> & {
	href: __next_route_internal_types__.RouteImpl<string>;
};

type TNavBarProps = React.ComponentProps<typeof NavigationMenu>;

const MemoizedNavigationMenuLink = React.memo(
	({ title, ...props }: React.ComponentProps<typeof NavigationMenuLink>) => {
		return (
			<NavigationMenuLink
				className={navigationMenuTriggerStyle({
					className:
						'aria-[current="page"]:bg-background bg-muted hover:bg-background/40 focus:bg-background/60 h-8 min-w-28 rounded-sm transition-all duration-150'
				})}
				{...props}
			>
				{title}
			</NavigationMenuLink>
		);
	}
);
MemoizedNavigationMenuLink.displayName = 'MemoizedNavigationMenuLink';

export function NavBar({ className, ...props }: TNavBarProps) {
	const pathname = usePathname();

	const memoizedMenuItems = React.useMemo(() => {
		const menuItems: Array<TMenuItem> = [
			{ href: '/dashboard', title: 'Unfollowers' },
			{ href: '/dashboard/not-mutuals', title: 'Not Mutuals' },
			// { href: '/dashboard/followers', title: 'Followers' },
			// { href: '/dashboard/following', title: 'Following' },
			{ href: '/dashboard/whitelist', title: 'Whitelist' }
		];

		return menuItems.map((item) =>
			Object.assign(item, { 'aria-current': item.href === pathname ? 'page' : 'false' })
		);
	}, [pathname]);

	return (
		<NavigationMenu className={cn('bg-muted h-10 flex-0 rounded-md p-1', className)} {...props}>
			<NavigationMenuList>
				{memoizedMenuItems.map((item, index) => (
					<NavigationMenuItem key={index}>
						<Link href={item.href} legacyBehavior passHref>
							<MemoizedNavigationMenuLink {...item} />
						</Link>
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	);
}
