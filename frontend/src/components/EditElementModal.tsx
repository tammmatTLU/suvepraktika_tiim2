import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateButton } from '../store/slices/buttonElementsSlice'
import { updateSpan } from '../store/slices/spanElementsSlice'

// import your update actions here

export default function EditElementModal({
  id,
  type,
  onClose,
}: {
  id: number;
  type: string;
  onClose: () => void;
}) {
  const dispatch = useDispatch();
  // Get the element from the store by id and type
  const element =
    useSelector((state: any) =>
      type === 'button'
        ? state.buttonElements.elements[id]
        : state.spanElements.elements[id]
    ) || {};

  // Local state for editing
  const [name, setName] = useState(element.name || '');
  const [backgroundColor, setBackgroundColor] = useState(element.backgroundColor || '#FFFFFF');
  const [color, setColor] = useState(element.color || '#000000');
  const [fontSize, setFontSize] = useState(element.fontSize || 16);
  const [fontFamily, setFontFamily] = useState(element.fontFamily || 'Arial');

  // Example: add more fields as needed

  // Update local state if element changes (e.g. when switching between devices)
  useEffect(() => {
    setName(element.name || '');
    setBackgroundColor(element.backgroundColor || '#FFFFFF');
    setColor(element.color || '#000000');
    setFontSize(element.fontSize || 16);
    setFontFamily(element.fontFamily || 'Arial');
  }, [element]);

  const handleSave = () => {
    if (type === 'button') {
      dispatch(updateButton({
        ...element,
        name,
        backgroundColor,
        color,
        fontSize,
        fontFamily,
      }));
    } else if (type === 'span') {
      dispatch(updateSpan({
        ...element,
        name,
        backgroundColor,
        color,
        fontSize,
        fontFamily,
      }));
    }
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <label htmlFor="editName">Nimi:</label>
        <input
          id="editName"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <label htmlFor="editBackgroundColor">Taustavärv:</label>
        <input
          id="editBackgroundColor"
          type="color"
          value={backgroundColor}
          onChange={e => setBackgroundColor(e.target.value)}
        />
        <label htmlFor="editColor">Tekstivärv:</label>
        <input
          id="editColor"
          type="color"
          value={color}
          onChange={e => setColor(e.target.value)}
        />
        <label htmlFor="editFontSize">Fondi suurus:</label>
        <input
          id="editFontSize"
          type="number"
          value={fontSize}
          onChange={e => setFontSize(Number(e.target.value))}
        />
        <label htmlFor="editFontFamily">Font:</label>
        <input
          id="editFontFamily"
          type="text"
          value={fontFamily}
          onChange={e => setFontFamily(e.target.value)}
        />
        <button onClick={handleSave}>Salvesta</button>
        <button onClick={onClose}>Sulge</button>
      </div>
    </div>
  );
}