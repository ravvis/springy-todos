import Todos from "../components/Todos";
import styles from "../styles/Home.module.css";

export default function Home() {
  return <div className={styles.container}>
    <h1>Todos</h1>
    <Todos/>
  </div>
}
