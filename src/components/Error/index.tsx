import styles from './index.module.scss';

export default function Error(): JSX.Element {
	return <span className={styles.error}>Error occurred! Sorry... 😢</span>;
}
