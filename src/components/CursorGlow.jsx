import { useEffect } from 'react';

function CursorGlow() {
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    document.body.appendChild(cursor);

    const move = (e) => {
      cursor.style.left = `${e.clientX - 30}px`;
      cursor.style.top = `${e.clientY - 30}px`;
    };

    window.addEventListener('mousemove', move);
    return () => {
      window.removeEventListener('mousemove', move);
      document.body.removeChild(cursor);
    };
  }, []);

  return null;
}

export default CursorGlow;
