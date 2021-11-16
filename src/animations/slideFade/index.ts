const slideFade: any = (delay = 0) => {
	return {
		initial: {
			y: 10,
			opacity: 0,
		},
		animate: {
			y: 0,
			opacity: 1,
			transition: {
				delay,
			},
		},
		exit: {
			scale: 0.5,
			opacity: 0,
			transition: {
				ease: 'easeOut',
				type: 'spring',
			},
		},
	};
};

export default slideFade;
