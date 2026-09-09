'use client';

import React, { useState, useEffect } from 'react';

export default function Footer() {
  const [year, setYear] = useState<number>(2024);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="foot">
      <p>© {year} Studio. A working portfolio.</p>
      <p>Built with restraint.</p>
    </footer>
  );
}
