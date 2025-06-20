import React from 'react';
import PropTypes from 'prop-types';

const CollapsiblePanel = ({ title, defaultOpen = false, children }) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);

    return (
        <div style={{
            fontFamily: 'sans-serif',
            border: '1px solid #ccc',
            borderRadius: '4px',
            overflow: 'hidden',
            maxWidth: '500px',
            margin: '1em auto'
        }}>
            <div
                style={{
                    backgroundColor: '#f0f0f0',
                    padding: '1em',
                    cursor: 'pointer',
                    userSelect: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid #ddd',
                }}
                onClick={() => setIsOpen(!isOpen)}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
            >
                <span>{title}</span>
                <svg
                    style={{
                        width: '12px',
                        height: '12px',
                        transition: 'transform 0.2s',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                    }}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M7 10l5 5 5-5z" />
                </svg>
            </div>
            <div
                style={{
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease-out',
                    maxHeight: isOpen ? '200px' : '0',
                    padding: isOpen ? '1em' : '0 1em',
                    display: isOpen ? 'block' : 'none',
                }}
                aria-hidden={!isOpen}
            >
                {children}
            </div>
        </div>
    );
};

CollapsiblePanel.propTypes = {
    title: PropTypes.string.isRequired,
    defaultOpen: PropTypes.bool,
    children: PropTypes.node.isRequired,
};

export default CollapsiblePanel;