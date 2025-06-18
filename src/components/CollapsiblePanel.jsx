import { useState } from 'react';

// Styles are scoped to the component using CSS-in-JS or imported CSS Modules
const styles = {
  container: {
    fontFamily: 'sans-serif',
    border: '1px solid #ccc',
    borderRadius: '4px',
    overflow: 'hidden',
    maxWidth: '500px',
    margin: '1em auto',
  },
  header: {
    backgroundColor: '#f0f0f0',
    padding: '1em',
    cursor: 'pointer',
    userSelect: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ddd',
    transition: 'background-color 0.2s',
  },
  headerHover: {
    backgroundColor: '#e0e0e0',
  },
  content: {
    overflow: 'hidden',
    transition: 'max-height 0.3s ease-out',
    maxHeight: '0',
    padding: '0 1em',
  },
  contentOpen: {
    maxHeight: '200px',
    padding: '1em',
  },
  icon: {
    width: '12px',
    height: '12px',
    transition: 'transform 0.2s',
  },
};

const CollapsiblePanel = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div style={styles.container}>
      <div
        style={{
          ...styles.header,
          ...(isOpen && { ...styles.headerHover }),
        }}
        onClick={toggle}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            toggle();
          }
        }}
      >
        <span>{title}</span>
        <svg
          style={{
            ...styles.icon,
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
          }}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </div>
      <div
        style={isOpen ? { ...styles.content, ...styles.contentOpen } : styles.content}
        aria-hidden={!isOpen}
      >
        {children}
      </div>
    </div>
  );
};

export default CollapsiblePanel;