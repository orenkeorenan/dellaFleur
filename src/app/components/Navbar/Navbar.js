import React from 'react';

function Navbar() {
  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.5rem 1rem',
        borderBottom: '1px solid #ccc',
        flexWrap: 'wrap',
      }}
    >
        <div style={{ flex: 1 }}></div>

        {/* Center */}
        <div style={{ flex: 1, textAlign: 'center', padding:".5rem" }}>
            <img
                src="/logo.png"
                alt="Wrap & Bloom Logo"
                style={{
                    height: '100px', // adjust as needed
                    objectFit: 'contain',
                }}
            />
        </div>

        {/* Right side */}
        <div
            style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '0.4rem', 
            }}
        >
            
            {/* <button
                style={{
                    background: '#0613c7',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    color: 'white',
                    borderRadius: '0.3rem',
                    padding: '0.4rem 0.6rem', 
                    border: '1px solid #0613c7',
                }}
            >
                Login
            </button> */}
        </div>
    </nav>
  );
}

export default Navbar;
