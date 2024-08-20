import React, { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import QuoteForm from './QuoteForm';

const QuoteList = () => {
  const [quotes, setQuotes] = useState([]);
  const [editingQuote, setEditingQuote] = useState(null);

  const fetchQuotes = useCallback(async () => {
    try {
      console.log('Fetching quotes');
      const querySnapshot = await getDocs(collection(db, 'quotes'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQuotes(data);
    } catch (error) {
      console.error('Errore nel recupero dei preventivi:', error);
    }
  }, []);

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  const handleDelete = async (id) => {
    try {
      console.log('Deleting quote:', id);
      await deleteDoc(doc(db, 'quotes', id));
      fetchQuotes();  // Ricarica la lista dopo la cancellazione
    } catch (error) {
      console.error('Errore nella cancellazione del preventivo:', error);
    }
  };

  const handleEdit = (quote) => {
    console.log('Editing quote:', quote.id);
    setEditingQuote(quote);
  };

  const handleSave = () => {
    console.log('Preventivo salvato, aggiornamento della lista');
    setEditingQuote(null);
    fetchQuotes();  // Aggiorna la lista dei preventivi
  };

  return (
    <div>
      <QuoteForm onSave={handleSave} quote={editingQuote} />
      <ul>
        {quotes.map((quote) => (
          <li key={quote.id}>
            <span>{quote.client} - {quote.project} - ${quote.amount}</span>
            <button onClick={() => handleEdit(quote)}>Edit</button>
            <button onClick={() => handleDelete(quote.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuoteList;
