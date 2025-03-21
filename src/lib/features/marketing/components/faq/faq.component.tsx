import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '$lib/components/ui/accordion';

type TFAQ = {
	question: string;
	answer: string | React.ReactNode;
};

const faq: Array<TFAQ> = [
	{
		question: 'What is GitHub Unfollow Checker?',
		answer:
			'GitHub Unfollow Checker is a tool that helps you identify users who don’t follow you back on GitHub. It also allows you to manage your followers and following lists efficiently.'
	},
	{
		question: 'How does the tool work?',
		answer:
			'The tool uses the GitHub API to fetch your followers and following lists. It compares them to identify users who don’t follow you back or whom you don’t follow back.'
	},
	{
		question: 'Is my data safe?',
		answer:
			'Yes, your data is safe. We only process your GitHub username and access token temporarily to interact with the GitHub API. No sensitive data is stored permanently.'
	},
	{
		question: 'Do you store my GitHub access token?',
		answer:
			'No, we do not store your GitHub access token. It is used only during your session to interact with the GitHub API securely.'
	},
	{
		question: 'Can I whitelist users?',
		answer:
			'Yes, you can add users to a whitelist to ensure they are not unfollowed, even if they don’t follow you back.'
	},
	{
		question: 'Is this tool affiliated with GitHub?',
		answer:
			'No, GitHub Unfollow Checker is not affiliated with, endorsed by, or officially connected to GitHub Inc.'
	},
	{
		question: 'What are the limitations of the tool?',
		answer:
			'The tool relies on the GitHub API, so any outages or limitations of the API may affect its functionality. Additionally, it is intended for personal use only.'
	},
	{
		question: 'What happens if I stop using the tool?',
		answer:
			'If you stop using the tool, your data will no longer be processed. We retain user data only while the service is actively being used.'
	},
	{
		question: 'How can I contact support?',
		answer: (
			<>
				You can contact us at our{' '}
				<a
					href='https://github.com/gustavomorinaga/github-unfollow-checker/discussions'
					target='_blank'
					rel='noopener noreferrer'
					className='text-primary hover:underline'
				>
					community
				</a>{' '}
				for any questions or assistance.
			</>
		)
	}
];

export function FAQ() {
	return (
		<div className='flex min-h-screen w-full items-center'>
			<div className='flex w-full flex-col px-4 md:px-0'>
				<h2 className='text-center text-4xl !leading-[1.15] font-bold tracking-tight text-balance md:text-5xl'>
					Questions & Answers
				</h2>

				<Accordion type='single' defaultValue='question-0' collapsible className='mt-6'>
					{faq.map(({ question, answer }, index) => (
						<AccordionItem key={question} value={`question-${index}`}>
							<AccordionTrigger className='cursor-pointer text-left text-lg'>
								{question}
							</AccordionTrigger>
							<AccordionContent className='text-balance'>{answer}</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</div>
	);
}
