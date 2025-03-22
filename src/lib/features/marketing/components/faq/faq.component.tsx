import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '$lib/components/ui/accordion';
import { siteMetadata } from '$lib/configs/site';

type TFAQ = {
	question: string;
	answer: string | React.ReactNode;
};

const faq: Array<TFAQ> = [
	{
		question: `What is ${siteMetadata.applicationName}?`,
		answer: `${siteMetadata.applicationName} is a tool that helps you identify users who don’t follow you back on GitHub. It also allows you to manage your followers and following lists efficiently.`
	},
	{
		question: `How does ${siteMetadata.applicationName} work?`,
		answer: `${siteMetadata.applicationName} uses the GitHub API to fetch your followers and following lists. It compares them to identify users who don’t follow you back or whom you don’t follow back.`
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
		question: `Is ${siteMetadata.applicationName} affiliated with GitHub?`,
		answer: `No, ${siteMetadata.applicationName} is not affiliated with, endorsed by, or officially connected to GitHub Inc.`
	},
	{
		question: `What are the limitations of ${siteMetadata.applicationName}?`,
		answer: `${siteMetadata.applicationName} relies on the GitHub API, so any outages or limitations of the API may affect its functionality. Additionally, it is intended for personal use only.`
	},
	{
		question: `What happens if I stop using ${siteMetadata.applicationName}?`,
		answer: `If you stop using ${siteMetadata.applicationName}, your data will no longer be processed. We retain user data only while the service is actively being used.`
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

/**
 * The `FAQ` component renders a section with frequently asked questions and their answers.
 *
 * @returns The rendered section with frequently asked questions and their answers.
 */
export function FAQ() {
	return (
		<div className='flex min-h-screen w-full items-center'>
			<div className='flex w-full flex-col items-center px-4 md:px-0'>
				<h2 className='text-center text-4xl !leading-[1.15] font-bold tracking-tight text-balance md:text-5xl'>
					Questions & Answers
				</h2>

				<Accordion
					type='single'
					defaultValue='question-0'
					collapsible
					className='mt-6 w-full max-w-screen-md'
				>
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
