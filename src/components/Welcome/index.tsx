import Image from 'next/image';
import { signIn } from 'next-auth/client';

// --- Styles ---
import styles from './index.module.scss';
import { FaGithub } from 'react-icons/fa';

export default function WelcomeComponent(): JSX.Element {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h1>GitHub Unfollow Checker</h1>
				<p>A simple tool to check the users that don&apos;t follow you back 🧐</p>
				<button
					className={styles.signIn}
					aria-label="Sign In"
					onClick={() => signIn('github')}
				>
					<FaGithub />
					Sign In
				</button>
			</div>

			<footer>
				<address>
					Developed with 💗 by&nbsp;
					<a
						className={styles.author}
						href="https://github.com/gmatthewsfeuer"
						target="_blank"
						rel="author noopener noreferrer"
					>
						<strong>Gustavo Matheus</strong>
					</a>
				</address>

				<a href="http://vercel.com" target="_blank" rel="noopener noreferrer">
					<picture className={styles.vercel}>
						<Image
							src="/assets/svgs/powered-by-vercel.svg"
							alt="Powered By Vercel"
							layout="fill"
							objectFit="contain"
						/>
					</picture>
				</a>
			</footer>
		</div>
	);
}
