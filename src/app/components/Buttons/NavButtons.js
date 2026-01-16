"use client"

import React from 'react';

function NavButtons({ active, setActive }) {

  const buttons = ['Products',"How to purchase?"];

  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      {buttons.map((btn) => (
        <button
            key={btn}
            onClick={() => setActive(btn)}
            style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                border: active === btn ? '2px solid #DC4D82' : '1px solid #ccc',
                backgroundColor: active === btn ? '#DC4D82' : '#fff',
                color: active === btn ? '#fff' : '#000',
                cursor: 'pointer',
                fontWeight: active === btn ? 'bold' : 'normal',
            }}
        >
          {btn}
        </button>
      ))}
    </div>
  );
}

export default NavButtons;
