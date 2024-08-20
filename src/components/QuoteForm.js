import React, { useState } from 'react';
import { addDoc, updateDoc, doc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const QuoteForm = ({ quote, onSave }) => {
  const [formData, setFormData] = useState({
    client: quote ? quote.client : '',
    project: quote ? quote.project : '',
    amount: quote ? quote.amount : '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (quote) {
        // Aggiorna il preventivo esistente
        const quoteRef = doc(db, 'quotes', quote.id);
        await updateDoc(quoteRef, formData);
      } else {
        // Crea un nuovo preventivo
        await addDoc(collection(db, 'quotes'), formData);
      }
      onSave();  // Chiamata a onSave per aggiornare la lista dei preventivi
    } catch (error) {
      console.error('Errore nel salvataggio del preventivo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="client"
        value={formData.client}
        onChange={handleChange}
        placeholder="Client"
        required
      />
      <input
        type="text"
        name="project"
        value={formData.project}
        onChange={handleChange}
        placeholder="Project"
        required
      />
      <input
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        placeholder="Amount"
        required
      />
      <button type="submit">Save Quote</button>
    </form>
  );
};

export default QuoteForm;
