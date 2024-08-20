import React, { useEffect, useState } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Assicurati che il percorso sia corretto

const TestFirestore = () => {
  const [quotes, setQuotes] = useState([]);

  // Funzione per aggiungere un nuovo documento a Firestore
  const addTestQuote = async () => {
    try {
      const docRef = await addDoc(collection(db, 'quotes'), {
        title: 'Test Preventivo',
        content: 'Questo è un preventivo di test aggiunto da React.',
      });
      console.log('Documento aggiunto con ID: ', docRef.id);
    } catch (e) {
      console.error('Errore nell\'aggiunta del documento: ', e);
    }
  };

  // Funzione per leggere i documenti dalla collezione "quotes"
  const fetchQuotes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'quotes'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQuotes(data);
    } catch (e) {
      console.error('Errore nella lettura dei documenti: ', e);
    }
  };

  useEffect(() => {
    fetchQuotes(); // Leggi i dati quando il componente viene montato
  }, []);

  return (
    <div>
      <h1>Test Firestore</h1>
      <button onClick={addTestQuote}>Aggiungi Preventivo di Test</button>
      <div>
        <h2>Preventivi:</h2>
        {quotes.map((quote) => (
          <div key={quote.id}>
            <h3>{quote.title}</h3>
            <p>{quote.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestFirestore;
