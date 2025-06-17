import { useDispatch } from "react-redux";
import { ActionCreators } from "redux-undo";

export default function RedoButton() {
  const dispatch = useDispatch();
  const handleRedo = () => {
    dispatch(ActionCreators.redo());
  };
  return (
    <button
      onClick={handleRedo}
      className="redo-button"
    >
      Redo
    </button>
  );
}