import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { addItem } from '../../src/api/Inventoryapi/api';
import * as z from 'zod';

const quantitySchema = z.number().positive().int();

const ItemForm = () => {
  const [formData, setFormData] = useState({ name: "", quantity: 0, category: "", description: "" });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation(addItem, {
    onSuccess: () => {
      queryClient.invalidateQueries('items');
      setSuccessMessage('Item added successfully!');
      setFormData({ name: '', quantity: 0, category: '', description: "" }); // Clear input fields
      setErrorMessage(''); // Clear error message
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedQuantity = quantitySchema.safeParse(parseInt(formData.quantity));
    if (parsedQuantity.success) {
      mutation.mutate(formData);
    } else {
      setErrorMessage('Please enter a valid positive integer for quantity.');
    
   
    }
  };

  return (
    <div className="max-w-md p-6 mx-auto bg-white rounded-md shadow-md">
      <h1 className="mb-4 text-2xl font-bold text-center">Add Item</h1>
      {successMessage && <p className="mb-4 text-center text-green-500">{successMessage}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-bold">Name</label>
          <input
            id="name"
            type="text"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Enter item name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-sm font-bold">Quantity</label>
          <input
            id="quantity"
            type="number"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Enter quantity"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
          />
        </div>
        {errorMessage && <p className="mb-4 text-center text-red-500">{errorMessage}</p>}
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-bold">Category</label>
          <input
            id="category"
            type="text"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Enter category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-bold">Description</label>
          <textarea
            id="description"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Enter description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows="4"
          />
        </div>
        <button type="submit" className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
          Add
        </button>
      </form>
    </div>
  );
};

export default ItemForm;
