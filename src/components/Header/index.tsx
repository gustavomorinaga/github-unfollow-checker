// --- Styles ---
import styles from './index.module.scss';

// --- Components ---
import Account from '@components/Account';

export default function Header({ account }): JSX.Element {
	return (
		<header className={styles.header}>
			<h1 className={styles.site_name}>GitHub Unfollow Checker</h1>
			<Account account={account} />
		</header>
	);
}
