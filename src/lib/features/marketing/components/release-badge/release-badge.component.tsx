import { AnimatedGradientText } from '$lib/components/magicui/animated-gradient-text';
import { cn } from '$lib/utils/ui';

import { Sparkles } from 'lucide-react';

export function ReleaseBadge() {
	return (
		<div className='group relative flex w-fit items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]'>
			<span
				className={cn(
					'animate-gradient via-primary/50 from-accent-foreground/50 to-accent-foreground/50 absolute inset-0 block h-full w-full rounded-[inherit] bg-gradient-to-r bg-[length:300%_100%] p-[1px]'
				)}
				style={{
					mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
					maskComposite: 'subtract',
					WebkitClipPath: 'padding-box',
					WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
					WebkitMaskComposite: 'destination-out'
				}}
			/>
			<Sparkles className='size-4' />
			<hr className='mx-2 h-4 w-px shrink-0 bg-neutral-500' />
			<AnimatedGradientText
				colorFrom='var(--accent-foreground)'
				colorTo='var(--primary)'
				className='text-sm font-medium'
			>
				New Stable 3.0 Release
			</AnimatedGradientText>
		</div>
	);
}
