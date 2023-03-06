import { useState } from 'react';
import reactLogo from '../assets/react.svg';
// eslint-disable-next-line import/no-unresolved
import styles from '../utils/styles/ViteReact.module.css';

function ViteReact() {
  const [count, setCount] = useState(0);

  return (
    <div className={styles['ViteReact-class']}>
      <div className={styles['Container-ViteReact']}>
        <div className={styles.ViteReact}>
          <div>
            <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
              <img src="/vite.svg" className={styles.logo} alt="Vite logo" />
            </a>
            <a href="https://reactjs.org" target="_blank" rel="noreferrer">
              <img src={reactLogo} className={`${styles.logo} ${styles.react}`} alt="React logo" />
            </a>
          </div>
          <h1>Vite + React</h1>
          <div className={styles.card}>
            {/* eslint-disable-next-line react/button-has-type, no-shadow */}
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p>
              Edit <code>src/App.jsx</code> and save to test HMR
            </p>
          </div>
          <p className={styles['read-the-docs']}>
            Click on the Vite and React logos to learn more
          </p>
        </div>
      </div>
    </div>
  );
}

export default ViteReact;
