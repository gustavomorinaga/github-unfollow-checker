import Link from 'next/link';

import { AnimatedGridPattern } from '$lib/components/magicui/animated-grid-pattern';
import { ShimmerButton } from '$lib/components/magicui/shimmer-button';
import { ReleaseBadge } from '$lib/features/marketing/components/release-badge';

import { ArrowUpRight } from 'lucide-react';

export function Hero() {
	return (
		<div className='relative flex min-h-screen items-center justify-center overflow-hidden px-6'>
			<AnimatedGridPattern
				numSquares={30}
				maxOpacity={0.1}
				duration={3}
				className='inset-0 skew-y-12 [mask-image:radial-gradient(400px_circle_at_center,white,transparent)]'
			/>

			<div className='relative z-10 text-center'>
				<div className='flex items-center justify-center'>
					<ReleaseBadge />
				</div>

				<h1 className='mt-6 text-4xl !leading-[1.2] font-bold tracking-tight text-balance sm:text-5xl md:text-6xl'>
					Your GitHub Network, Your Rules
				</h1>

				<p className='mt-6 text-base font-medium text-balance md:text-lg'>
					Discover who’s not following you back and streamline your connections with ease. Open
					Source. Free forever.
				</p>

				<div className='mt-12 flex items-center justify-center gap-4'>
					<ShimmerButton aria-label='Get Started' background='var(--primary)' asChild>
						<Link href='/login'>
							<span className='select-none'>Get Started</span>
							<ArrowUpRight className='ml-3' />
						</Link>
					</ShimmerButton>
				</div>
			</div>
		</div>
	);
}
