// --- Styles ---
import styles from './index.module.scss';

// --- Components ---
import AccountComponent from '@components/Account';

export default function HeaderComponent({ account }): JSX.Element {
	return (
		<header className={styles.header}>
			<h1 className={styles.site_name}>GitHub Unfollow Checker</h1>
			<AccountComponent account={account} />
		</header>
	);
}
