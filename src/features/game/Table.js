import { useSelector } from 'react-redux';
import { selectLeaderboard } from './gameSlice';
import styles from './Table.module.css';

export function Table() {
  const leaderboard = useSelector(selectLeaderboard);

  function renderLeaderboardTable() {
    return leaderboard.map(({ name, score }, i) => (
      <tr className={styles.row} key={i}>
        <td className={styles.cell}>{name}</td>
        <td className={styles.cell}>{score}</td>
      </tr>
    ));
  }

  return (
    <table className={styles.table}>
      <tbody>
        <tr className={styles.row}>
          <td className={styles.cell}>имя</td>
          <td className={styles.cell}>очки</td>
        </tr>
        {renderLeaderboardTable()}
      </tbody>
    </table>
  );
}
