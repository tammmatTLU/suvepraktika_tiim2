import React from 'react';

interface BackButtonProps {
    onClick?: () => void;
    label?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, label = 'Tagasi' }) => {
    const handleClick = () => {
        if (onClick) {
            onClick();
        } else if (window.history.length > 1) {
            window.history.back();
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className="back-btn"
            hidden={localStorage.getItem('userName') !== "admin"}
        >
            &#8592; {label}
        </button>
    );
};

export default BackButton;