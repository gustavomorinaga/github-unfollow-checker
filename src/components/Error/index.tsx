import styles from './index.module.scss';

import type { JSX } from 'react';

export default function Error(): JSX.Element {
	return <span className={styles.error}>Error occurred! Sorry... 😢</span>;
}
