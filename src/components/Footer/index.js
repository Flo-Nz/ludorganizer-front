import React from 'react';

import './styles.scss';

const Footer = () => {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
  const now = new Date();
  const year = now.getFullYear();

  return (
    <footer className="copyright">
      Ludorganizer, l'organisateur personnel de ludothèque - {year} ©
    </footer>
  );
};

export default Footer;