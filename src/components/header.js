import React from 'react';

const Header = () => {
    const containerStyle = {
        border: '2px solid black',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '20px',
    };

    const titleStyle = {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        margin: '0',
    };

    return (
        <div className="container" style={containerStyle}>
            <div className="row">
                <div className="col-md-4">
                    {/* Inline SVG Leaf Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: '100px', height: '100px', fill: '#1976d2' }}>
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 18h2v-2h-2zm2-4h-2V8h2v8zm-3.1-10.11L9 9l1.41-1.41L12 9.17l1.59-1.59L15 9l-3.1 3.89z" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default Header;
