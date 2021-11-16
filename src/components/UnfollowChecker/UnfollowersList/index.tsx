import { useState } from 'react';
import { AnimatePresence, Reorder } from 'framer-motion';

// --- Interfaces ---
import { IUnfollower } from '@interfaces/IUser';

// --- Styles ---
import styles from './index.module.scss';

// --- Components ---
import UnfollowerComponent from '../Unfollower';

// --- Animations ---
import slideFade from '@animations/slideFade';

export default function UnfollowersListComponent({
	unfollowers,
	handleUnfollowUser,
	handleAddUserToWhitelist,
}: {
	unfollowers: IUnfollower[];
	handleUnfollowUser: any;
	handleAddUserToWhitelist: any;
}): JSX.Element {
	const [users, setUsers] = useState(unfollowers);

	return (
		<div className={styles.container}>
			<AnimatePresence>
				<Reorder.Group className={styles.list} values={users} onReorder={setUsers}>
					{unfollowers.map((unfollower, index) => (
						<Reorder.Item
							value={unfollower.login}
							key={unfollower.login}
							variants={slideFade(index * 0.1)}
							initial="initial"
							animate="animate"
							exit="exit"
						>
							<UnfollowerComponent
								unfollower={unfollower}
								handleUnfollowUser={handleUnfollowUser}
								handleAddUserToWhitelist={handleAddUserToWhitelist}
							/>
						</Reorder.Item>
					))}
				</Reorder.Group>
			</AnimatePresence>
		</div>
	);
}
