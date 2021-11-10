import { motion } from 'framer-motion';

// --- Styles ---
import styles from './index.module.scss';
import { FiGithub, FiSearch } from 'react-icons/fi';

export default function SearchComponent({
	login,
	handleChangeLogin,
	handleSearchLogin,
	placeholder,
}): JSX.Element {
	return (
		<motion.div className={styles.container}>
			<form className={styles.search}>
				<label>
					<FiGithub className={styles.label_icon} />
					<input
						type="text"
						name="login"
						id="login"
						value={login}
						placeholder={placeholder}
						onChange={handleChangeLogin}
					/>
				</label>
				<button onClick={handleSearchLogin} aria-label="Search">
					<FiSearch />
				</button>
			</form>
		</motion.div>
	);
}
