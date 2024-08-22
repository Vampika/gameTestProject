import styles from "./MainPage.module.css";
import { useEffect, useState } from "react";
import { getGameTimer } from "../logic/gameTimer.js";
import { Character } from "../logic/character.js";
import Canvas from "../components/canvas.jsx";
import ScoreBoard from "../components/ScoreBoard.jsx";
import ModalWindow from "../components/ModalWindow.jsx";

//
function MainPage() {
  const [state, setState] = useState(0);
  const [color, setColor] = useState("red");
  const [modalActive, setModalActive] = useState({status: false, x: 0, y:0, charId: 0});
  const [properties, setProperties] = useState([{color: "#e66465", speed: 10, shotsSpeed: 500},{color: "#f6b73c", speed: 10, shotsSpeed: 500}]);

  return (
    <div className={styles["wrapper"]}>
		<div>Для изменения цвета, скорости движения и ходьбы, кликните на персонажа</div>
      <ModalWindow modalActive={modalActive} setModalActive={setModalActive} properties={properties} setProperties={setProperties}/>
      <div>Счетчик попаданий: {state}</div>
      <Canvas color={color} countState={state} setState={setState} setModalActive={setModalActive} properties={properties}/>
    </div>
  );
}

export default MainPage;
