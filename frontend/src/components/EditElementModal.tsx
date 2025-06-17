import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateButton } from '../store/slices/buttonElementsSlice'
import { updateSpan } from '../store/slices/userPageSlice'

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
        ? state.undoableRoot.present.buttonElements.elements[id]
        : state.undoableRoot.present.userPage.elements[id]
    ) || {};

  // Local state for editing
    const [name, setName] = useState(element.name || '');
    const [backgroundColor, setBackgroundColor] = useState(element.backgroundColor || '#FFFFFF');
    const [isTransparent, setIsTransparent] = useState(element.backgroundColor === 'transparent');
    const [color, setColor] = useState(element.color || '#000000');
    const [fontSize, setFontSize] = useState(element.fontSize || 16);
    const [fontFamily, setFontFamily] = useState(element.fontFamily || 'Arial');
    const [templateId, setTemplateId] = useState(element.templateId || '');

  // Example: add more fields as needed

    const [templates, setTemplates] = useState<{ id: number; name: string }[]>([]);
    const [templatesLoading, setTemplatesLoading] = useState(false);
    const [templatesError, setTemplatesError] = useState<string | null>(null);

    useEffect(() => {
    if (type === 'button') {
      setTemplatesLoading(true);
      setTemplatesError(null);
      fetch('http://localhost:3006/api/button-templates')
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch templates');
          return res.json();
        })
        .then(data => {
          setTemplates(data.data || []);
          setTemplatesLoading(false);
        })
        .catch(err => {
          setTemplatesError('Mallide laadimine ebaõnnestus' + err);
          setTemplates([]);
          setTemplatesLoading(false);
        });
    }
  }, [type]);

  // Update local state if element changes (e.g. when switching between devices)
  useEffect(() => {
    setName(element.name || '');
    setBackgroundColor(element.backgroundColor || '#FFFFFF');
    setIsTransparent(element.backgroundColor === 'transparent');
    setColor(element.color || '#000000');
    setFontSize(element.fontSize || 16);
    setFontFamily(element.fontFamily || 'Arial');
    setTemplateId(element.templateId || '');
  }, [element]);

  const handleSave = () => {
    const bgColor = isTransparent ? 'transparent' : backgroundColor;
    if (type === 'button') {
      dispatch(updateButton({
        ...element,
        name,
        backgroundColor: bgColor,
        color,
        fontSize,
        fontFamily,
        templateId,
      }));
    } else if (type === 'span') {
      dispatch(updateSpan({
        ...element,
        name,
        backgroundColor: bgColor,
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
        {type === 'button' && (
          <>
            <label htmlFor="editTemplateSelect">Mall:</label>
            <select
              id="editTemplateSelect"
              value={templateId}
              onChange={e => setTemplateId(e.target.value)}
              disabled={templatesLoading}
            >
              <option value="">-- Vali mall --</option>
              {templatesLoading && <option disabled>Laadimine...</option>}
              {templatesError && <option disabled>{templatesError}</option>}
              {templates.map(t => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </>
        )}
        <label htmlFor="editBackgroundColor">Taustavärv:</label>
        <input
            id="editBackgroundColor"
            type="color"
            value={isTransparent ? '#FFFFFF' : backgroundColor}
            disabled={isTransparent}
            onChange={e => setBackgroundColor(e.target.value)}
        />
        <label htmlFor="editBackgroundAlpha">Taustavärvi läbipaistvus:</label>
            <input
            id="editBackgroundAlpha"
            type="range"
            min={0}
            max={100}
            value={Math.round(
                backgroundColor.startsWith('rgba')
                ? Number(backgroundColor.split(',')[3]?.replace(')', '').trim()) * 100
                : 100
            )}
            onChange={e => {
                const alpha = Number(e.target.value) / 100;
                // Convert hex or rgb to rgba with new alpha
                let rgb = [255, 255, 255];
                if (backgroundColor.startsWith('#')) {
                const hex = backgroundColor.replace('#', '');
                rgb = [
                    parseInt(hex.substring(0, 2), 16),
                    parseInt(hex.substring(2, 4), 16),
                    parseInt(hex.substring(4, 6), 16),
                ];
                } else if (backgroundColor.startsWith('rgb')) {
                rgb = backgroundColor
                    .replace(/[^\d,]/g, '')
                    .split(',')
                    .slice(0, 3)
                    .map(Number);
                }
                setBackgroundColor(`rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`);
            }}
            />
        <span>
            {Math.round(
                backgroundColor.startsWith('rgba')
                ? Number(backgroundColor.split(',')[3]?.replace(')', '').trim()) * 100
                : 100
            )}
            %
        </span>
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