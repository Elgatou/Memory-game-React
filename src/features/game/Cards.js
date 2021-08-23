import { Card } from './Card';
import styles from './Card.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { selectCards, choiceCard } from './gameSlice';
export function Cards() {
  let cardsData = useSelector(selectCards);
  let dispatch = useDispatch();

  let cardsArr = cardsData.map((e, i) => (
    <div key={i} onClick={() => dispatch(choiceCard(i))}>
      <Card cardData={e} />
    </div>
  ));

  return <div className={styles.cards}>{cardsArr}</div>;
}
