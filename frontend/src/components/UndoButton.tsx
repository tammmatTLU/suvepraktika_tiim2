import { useDispatch } from "react-redux";
import { ActionCreators } from "redux-undo";

export default function UndoButton() {
  const dispatch = useDispatch();
  const handleUndo = () => {
    dispatch(ActionCreators.undo());
  };
  return (
    <button
      onClick={handleUndo}
      className="undo-button"
    >
      Undo
    </button>
  );
}