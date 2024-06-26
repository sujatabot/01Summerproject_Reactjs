import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getItems, deleteItem, updateItem } from '../../src/api/Inventoryapi/api';

const ItemList = ({ setSelectedItem }) => {
  const queryClient = useQueryClient();
  const { data: items, error, isLoading } = useQuery('items', getItems);

  const mutation = useMutation(deleteItem, {
    onSuccess: () => {
      queryClient.invalidateQueries('items');
    },
  });

  const [editItem, setEditItem] = useState(null);

  const handleEdit = (item) => {
    setEditItem(item);
  };

  const handleSave = async (editedItem) => {
    await updateItem(editedItem.id, editedItem);
    setEditItem(null);
    queryClient.invalidateQueries('items');
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const sortedItems = [...items].sort((a, b) => a.id - b.id);

  return (
    <div className="flex justify-center mt-8">
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-4 text-2xl font-bold text-center">Items</h1>
        <table className="min-w-full border divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border">ID</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border">Name</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border">Quantity</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border">Category</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border">Description</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border">Created At</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedItems.map(item => (
              <tr key={item.id}>
                <td className="px-6 py-4 border whitespace-nowrap">{item.id}</td>
                <td className="px-6 py-4 border whitespace-nowrap">
                  {editItem && editItem.id === item.id ? (
                    <input
                      type="text"
                      value={editItem.name}
                      onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                    />
                  ) : (
                    item.name
                  )}
                </td>
                <td className="px-6 py-4 border whitespace-nowrap">
                  {editItem && editItem.id === item.id ? (
                    <input
                      type="text"
                      value={editItem.quantity}
                      onChange={(e) => setEditItem({ ...editItem, quantity: e.target.value })}
                    />
                  ) : (
                    item.quantity
                  )}
                </td>
                <td className="px-6 py-4 border whitespace-nowrap">
                  {editItem && editItem.id === item.id ? (
                    <input
                      type="text"
                      value={editItem.category}
                      onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
                    />
                  ) : (
                    item.category
                  )}
                </td>
                <td className="px-6 py-4 border whitespace-nowrap">
                  {editItem && editItem.id === item.id ? (
                    <input
                      type="text"
                      value={editItem.description}
                      onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                    />
                  ) : (
                    item.description
                  )}
                </td>
                <td className="px-6 py-4 border whitespace-nowrap">{item.createdAt}</td>
                <td className="px-6 py-4 border whitespace-nowrap">
                  {editItem && editItem.id === item.id ? (
                    <button className="text-indigo-600 hover:text-indigo-900" onClick={() => handleSave(editItem)}>Save</button>
                  ) : (
                    <button
                      className="px-3 py-1 mr-2 text-indigo-600 transition-colors duration-300 bg-transparent border border-indigo-600 rounded-md hover:text-indigo-900 hover:bg-indigo-50 hover:border-indigo-900"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="px-3 py-1 text-red-600 transition-colors duration-300 bg-transparent border border-red-600 rounded-md hover:text-red-900 hover:bg-red-50 hover:border-red-900"
                    onClick={() => mutation.mutate(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

ItemList.propTypes = {
  setSelectedItem: PropTypes.func.isRequired,
};

export default ItemList;
