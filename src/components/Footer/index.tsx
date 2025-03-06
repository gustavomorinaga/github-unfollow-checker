// --- Styles ---
import styles from './index.module.scss';

import type { JSX } from 'react';

export default function Footer(): JSX.Element {
	return (
		<footer className={styles.footer}>
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

			<a
				className={styles.link_vercel}
				href="http://vercel.com"
				target="_blank"
				rel="noopener noreferrer"
			>
				<picture className={styles.vercel}>
					<img
						src="/assets/svgs/powered-by-vercel.svg"
						alt="Powered By Vercel"
						width={212}
						height={44}
					/>
				</picture>
			</a>
		</footer>
	);
}
