import Image from 'next/image';
import { useRef } from 'react';
import { motion } from 'framer-motion';

// --- Interfaces ---
import { IUser_Page } from '@interfaces/IUser';

// --- Styles ---
import styles from './index.module.scss';
import { FiBook, FiGithub, FiMapPin, FiUsers } from 'react-icons/fi';

// --- Components ---
import Loader from '@components/Loader';

// --- Animations ---
import zoom from '@animations/zoom';

export default function UserComponent({ user, error }: IUser_Page): JSX.Element {
	const constraintsRef = useRef(null);

	if (error)
		return (
			<div className={styles.container}>
				<h1 className={styles.error_message}>Houve um erro!</h1>
			</div>
		);

	if (!user)
		return (
			<div className={styles.container}>
				<Loader />
			</div>
		);

	return (
		<motion.div className={styles.container} ref={constraintsRef}>
			<motion.section
				className={styles.user}
				whileHover={zoom}
				drag
				dragConstraints={constraintsRef}
				dragElastic={0.5}
				whileDrag={{ opacity: 0.5 }}
			>
				<picture className={styles.avatar}>
					<Image
						src={user.avatar_url}
						loading="lazy"
						layout="fill"
						objectFit="cover"
						alt={user.name}
					/>
				</picture>
				<div className={styles.content}>
					<header className={styles.account}>
						{user.name && <h1 className={styles.name}>{user.name}</h1>}
						<div className={styles.link}>
							<a
								className={styles.login}
								href={user.html_url}
								target="_blank"
								rel="noopener noreferrer"
							>
								<FiGithub />
								{user.login}
							</a>
						</div>
					</header>
					<div className={styles.details}>
						<div className={styles.follow}>
							<FiUsers />
							<span>
								<strong>{user.followers}</strong> followers
							</span>
							·
							<span>
								<strong>{user.following}</strong> following
							</span>
						</div>
						<span className={styles.public_repos}>
							<FiBook />
							<strong>{user.public_repos}</strong>
						</span>
						{user.location && (
							<span className={styles.location}>
								<FiMapPin /> {user.location}
							</span>
						)}
					</div>
					{user.bio && <p className={styles.bio}>{user.bio}</p>}
				</div>
			</motion.section>
		</motion.div>
	);
}
