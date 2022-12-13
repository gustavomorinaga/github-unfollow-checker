import { signIn } from 'next-auth/react';

// --- Styles ---
import styles from './index.module.scss';
import { FaGithub } from 'react-icons/fa';

export default function Welcome(): JSX.Element {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h1>GitHub Unfollow Checker</h1>
				<p>A simple tool to check the users that doesn&apos;t follow you back 🧐</p>
				<button
					className={styles.signIn}
					aria-label="Sign In"
					onClick={() => signIn('github')}
				>
					<FaGithub />
					Sign In
				</button>
			</div>
		</div>
	);
}
