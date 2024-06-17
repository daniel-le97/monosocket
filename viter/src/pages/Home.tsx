import { createSignal } from 'solid-js'
import solidLogo from '../assets/solid.svg'
import viteLogo from '/vite.svg'
import styles from './Home.module.css'

function Home() {
  const [count, setCount] = createSignal(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class={styles.logo} alt="Vite logo" />
        </a>
        <a href="https://solidjs.com" target="_blank">
          <img src={solidLogo} class={[styles.logo,styles.solid].join(' ')} alt="Solid logo" />
        </a>
      </div>
      <h1>Vite + Solid</h1>
      <div class={styles.card}>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count()}
        </button>
        <p>
          Edit <code>pages/Home.tsx</code> and save to test HMR
        </p>
      </div>
      <p class={styles.read_the_docs}>
        Click on the Vite and Solid logos to learn more
      </p>
    </>
  )
}

export default Home
