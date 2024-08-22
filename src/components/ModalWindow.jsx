import { useState, useEffect } from "react";

//Этот код отвечает за появление и логику модального окна с настройками персонажей
function ModalWindow({ modalActive, properties, setProperties, setModalActive }) {
    const charId = modalActive.charId;

    const initialInputsState = {
        color: properties[charId]?.color || "#ff0000", 
        speed: properties[charId]?.speed || 10, 
        shotsSpeed: properties[charId]?.shotsSpeed || 500 
    };

    const [inputsState, setInputsState] = useState(initialInputsState);

    useEffect(() => {
        setInputsState(initialInputsState);
    }, [charId, properties]);

    const saveChanges = (e) => {
        e.preventDefault();
		let mewArray = properties.slice();
		mewArray[charId] = inputsState;
		setProperties(mewArray);
    };

    return (
        <div className={modalActive.status ? "modal active" : "modal"} onClick={() => setModalActive(prevState => ({ ...prevState, status: false }))}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ top: modalActive.y, left: modalActive.x }}>
                <form className="form">
                    <label>
                        Hero Color:
                        <input type="color" value={inputsState.color} onChange={(e) => setInputsState(prevState => ({ ...prevState, color: e.target.value }))} />
                    </label>
                    <label>
                        Hero Speed:
                        <div className="range-wrapper">
                            {10}
                            <input type="range" min="10" max="100" value={inputsState.speed} onChange={(e) => setInputsState(prevState => ({ ...prevState, speed: Number(e.target.value) }))} />
                            {100}
                        </div>
                    </label>
                    <label>
                        Shots Speed:
                        <div className="range-wrapper">
                            {10}
                            <input type="range" min="10" max="500" value={inputsState.shotsSpeed} onChange={(e) => setInputsState(prevState => ({ ...prevState, shotsSpeed: Number(e.target.value) }))} />
                            {500}
                        </div>
                    </label>
                    <button onClick={saveChanges}>Подтвердить</button>
                </form>
            </div>
        </div>
    );
}

export default ModalWindow;