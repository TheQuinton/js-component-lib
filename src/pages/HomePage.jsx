import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1>Welcome to Component Library</h1>
                <p>Explore and test reusable React components</p>
            </header>

            <main style={styles.grid}>
                <section style={styles.card}>
                    <h2>📘 Collapsible Panel</h2>
                    <p>A customizable collapsible/accordion component.</p>
                    <Link to="/collapsible" style={styles.link}>
                        View Demo →
                    </Link>
                </section>

                <section style={styles.card}>
                    <h2>🧮 String Array Transformer</h2>
                    <p>Parse, transform, sort, and manipulate arrays of strings.</p>
                    <Link to="/transformer" style={styles.link}>
                        Try It Out →
                    </Link>
                </section>

                <section style={styles.card}>
                    <h2>🌐 API Data Display</h2>
                    <p>Fetch and display data from external APIs</p>
                    <Link to="/data" style={styles.link}>
                        Try It Out →
                    </Link>
                </section>

                <section style={styles.card}>
                    <h2>🖼️ Image Loader</h2>
                    <p>Load an image by reading its URL from a JSON file via REST API.</p>
                    <Link to="/image-loader" style={styles.link}>
                        Load Image →
                    </Link>
                </section>
            </main>

            <footer style={styles.footer}>
                <p>React Component Library &copy; {new Date().getFullYear()}</p>
            </footer>
        </div>
    );
};

export default HomePage;

// Styles (CSS-in-JS for simplicity and no external dependencies)
const styles = {
    container: {
        fontFamily: '"Segoe UI", sans-serif',
        padding: '2rem',
        maxWidth: '960px',
        margin: '0 auto',
        textAlign: 'center',
    },
    header: {
        marginBottom: '2rem',
    },
    grid: {
        display: 'grid',
        gap: '2rem',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        marginBottom: '4rem',
    },
    card: {
        background: '#f9f9f9',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '2rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        transition: 'box-shadow 0.3s ease',
    },
    link: {
        display: 'inline-block',
        marginTop: '1rem',
        color: '#007acc',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
    footer: {
        borderTop: '1px solid #eee',
        paddingTop: '2rem',
        color: '#777',
    },
};