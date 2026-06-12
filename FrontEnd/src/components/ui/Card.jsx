import React from 'react';
import './Card.css';

const Card = ({
    children,
    title,
    subtitle,
    footer,
    className = '',
    padding = 'md',
    hover = false,
    ...props
}) => {
    return (
        <div
            className={`card ${hover ? 'card-hover' : ''} card-p-${padding} ${className}`}
            {...props}
        >
            {(title || subtitle) && (
                <div className="card-header">
                    {title && <h3 className="card-title">{title}</h3>}
                    {subtitle && <p className="card-subtitle">{subtitle}</p>}
                </div>
            )}
            <div className="card-body">
                {children}
            </div>
            {footer && (
                <div className="card-footer">
                    {footer}
                </div>
            )}
        </div>
    );
};

export default Card;
