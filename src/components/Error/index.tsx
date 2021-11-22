import styles from './index.module.scss';

export default function ErrorComponent(): JSX.Element {
	return <span className={styles.error}>Error occurred! Sorry... 😢</span>;
}
