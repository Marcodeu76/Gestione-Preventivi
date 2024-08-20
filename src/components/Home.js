import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Benvenuti in Gestione Preventivi</h1>
      <p>La nostra piattaforma ti aiuta a gestire e organizzare preventivi in modo semplice ed efficiente.</p>
      <ul>
        <li>Registra un nuovo preventivo in pochi passi.</li>
        <li>Consulta e gestisci i preventivi esistenti.</li>
        <li>Accedi da qualsiasi dispositivo, ovunque tu sia.</li>
      </ul>
      <p>Per iniziare, <Link to="/login">accedi</Link> o <Link to="/register">crea un account</Link> se sei un nuovo utente.</p>
    </div>
  );
};

export default Home;
