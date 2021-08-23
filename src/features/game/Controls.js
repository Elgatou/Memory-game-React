import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTimer, selectGameStatus, play, addRecord, setIdle } from './gameSlice';

export function Controls() {
  const [username, setUsername] = useState('');

  const dispatch = useDispatch();
  const timer = useSelector(selectTimer);
  const status = useSelector(selectGameStatus);
  const win = status === 'win' ? true : false;

  function handleRecord() {
    if (win) {
      dispatch(addRecord(username));
      setUsername('');
      dispatch(setIdle());
    }
  }

  const time = new Date(timer * 1000).toISOString().substr(11, 8);

  return (
    <div>
      <div>{time}</div>
      <button onClick={() => dispatch(play())}>play</button>
      {status === 'prepare' && <p>Запомните расположение карточек, игра начнётся через несколько секунд</p>}
      {win && (
        <div>
          <p>Победа! Введите имя для добавления результата в таблицу рекордов</p>
          <input onChange={(e) => setUsername(e.target.value)} value={username} />
          <button onClick={handleRecord}>добавить</button>
        </div>
      )}
      {status === 'lose' && <p>Вы проиграли</p>}
    </div>
  );
}
