import React, { useEffect, useState } from 'react';
import QuoteForm from './QuoteForm';
import QuoteList from './QuoteList';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Quotes = ({ token }) => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'quotes'));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setQuotes(data);
      } catch (error) {
        console.error('Errore nel recupero dei preventivi:', error);
      }
    };

    fetchQuotes(); 
  }, []);

  const handleAddQuote = async (quoteData) => {
    try {
      const docRef = await addDoc(collection(db, 'quotes'), quoteData);
      setQuotes([...quotes, { id: docRef.id, ...quoteData }]);
    } catch (error) {
      console.error('Errore nell\'aggiunta del preventivo:', error);
    }
  };

  return (
    <div>
      <h2>Gestisci i tuoi preventivi</h2>
      <QuoteForm onAddQuote={handleAddQuote} />
      <QuoteList quotes={quotes} />
    </div>
  );
};

export default Quotes;
