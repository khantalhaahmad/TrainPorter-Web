import React from 'react';
import './Input.css';

const Input = ({
    label,
    error,
    icon,
    className = '',
    ...props
}) => {
    return (
        <div className={`input-group ${className} ${error ? 'input-error' : ''}`}>
            {label && <label className="input-label">{label}</label>}
            <div className="input-wrapper">
                {icon && <span className="input-icon">{icon}</span>}
                <input
                    className={`input-field ${icon ? 'with-icon' : ''}`}
                    {...props}
                />
            </div>
            {error && <span className="input-error-msg">{error}</span>}
        </div>
    );
};

export default Input;
