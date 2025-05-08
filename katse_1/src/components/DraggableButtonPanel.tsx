import React, { useState, useEffect } from 'react';
import './DraggableButtonPanel.css';

interface ButtonConfig {
  id: string;
  text: string;
  x: number;
  y: number;
  action?: () => void;
}

interface DraggableButtonPanelProps {
  initialButtons?: ButtonConfig[];
  onButtonsChange?: (buttons: ButtonConfig[]) => void;
}

const DraggableButtonPanel: React.FC<DraggableButtonPanelProps> = ({ 
  initialButtons = [], 
  onButtonsChange 
}) => {
  const [buttons, setButtons] = useState<ButtonConfig[]>(initialButtons);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Load saved buttons on component mount
  useEffect(() => {
    const savedButtons = localStorage.getItem('draggableButtons');
    if (savedButtons) {
      setButtons(JSON.parse(savedButtons));
    }
  }, []);

  // Save buttons when they change
  useEffect(() => {
    if (onButtonsChange) {
      onButtonsChange(buttons);
    }
    localStorage.setItem('draggableButtons', JSON.stringify(buttons));
  }, [buttons, onButtonsChange]);

  const handleMouseDown = (id: string, e: React.MouseEvent) => {
    const button = buttons.find(b => b.id === id);
    if (!button) return;

    setDraggingId(id);
    setDragOffset({
      x: e.clientX - button.x,
      y: e.clientY - button.y
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!draggingId) return;

    setButtons(prevButtons => 
      prevButtons.map(button => 
        button.id === draggingId
          ? { ...button, x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y }
          : button
      )
    );
  };

  const handleMouseUp = () => {
    setDraggingId(null);
  };

  // Add event listeners for drag
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingId, dragOffset]);

  const addNewButton = (text: string) => {
    const newButton: ButtonConfig = {
      id: `btn-${Date.now()}`,
      text,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };
    setButtons([...buttons, newButton]);
  };

  return (
    <div className="draggable-panel">
      {buttons.map(button => (
        <button
          key={button.id}
          className="draggable-button"
          style={{
            position: 'absolute',
            left: `${button.x}px`,
            top: `${button.y}px`,
            cursor: draggingId === button.id ? 'grabbing' : 'grab'
          }}
          onMouseDown={(e) => handleMouseDown(button.id, e)}
          onClick={button.action}
        >
          {button.text}
        </button>
      ))}
      
      <AddButtonControl onAddButton={addNewButton} />
    </div>
  );
};

const AddButtonControl: React.FC<{ onAddButton: (text: string) => void }> = ({ onAddButton }) => {
  const [buttonText, setButtonText] = useState('');

  return (
    <div className="add-button-control">
      <input
        type="text"
        value={buttonText}
        onChange={(e) => setButtonText(e.target.value)}
        placeholder="New button text"
      />
      <button onClick={() => {
        if (buttonText.trim()) {
          onAddButton(buttonText.trim());
          setButtonText('');
        }
      }}>
        Add Button
      </button>
    </div>
  );
};

export default DraggableButtonPanel;