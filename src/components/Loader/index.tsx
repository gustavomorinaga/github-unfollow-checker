const Loader: React.FC = () => {
	return (
		<div className="absolute inset-0 flex items-center justify-center">
			<div className="relative inline-block w-5 h-5 -ml-16 [&>div]:animate-roller [&>div]:origin-[40px_40px] [&>div]:after:absolute [&>div]:after:block [&>div]:after:size-2 [&>div]:after:rounded-full [&>div]:after:bg-white [&>div]:after:-mx-1 [&>div]:after:my-0">
				<div className="after:top-[63px] after:left-[63px]" style={{ animationDelay: '-0.036s' }}></div>
				<div className="after:top-[68px] after:left-[56px]" style={{ animationDelay: '-0.072s' }}></div>
				<div className="after:top-[71px] after:left-[48px]" style={{ animationDelay: '-0.108s' }}></div>
				<div className="after:top-[72px] after:left-[40px]" style={{ animationDelay: '-0.144s' }}></div>
				<div className="after:top-[71px] after:left-[32px]" style={{ animationDelay: '-0.180s' }}></div>
				<div className="after:top-[68px] after:left-[24px]" style={{ animationDelay: '-0.216s' }}></div>
				<div className="after:top-[63px] after:left-[17px]" style={{ animationDelay: '-0.252s' }}></div>
				<div className="after:top-[56px] after:left-[12px]" style={{ animationDelay: '-0.288s' }}></div>
			</div>
		</div>
	);
};

export default Loader;
