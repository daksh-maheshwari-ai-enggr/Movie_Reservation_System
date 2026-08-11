import { useState, useEffect } from 'react';

const SeatCategories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('Silver');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');
  
  // State to track if we are editing an existing category ID
  const [editingId, setEditingId] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/seat-categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const loadInitialData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/seat-categories');
        const data = await response.json();
        if (isMounted) setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    loadInitialData();
    return () => { isMounted = false; };
  }, []);

  // Handles both Create (POST) and Update (PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      
      if (editingId) {
        // UPDATE (PUT) Request
        response = await fetch(`http://localhost:5000/api/seat-categories/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, price: Number(price) })
        });
      } else {
        // CREATE (POST) Request
        response = await fetch('http://localhost:5000/api/seat-categories/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, price: Number(price) })
        });
      }

      if (response.ok) {
        setMessage(editingId ? 'Category updated successfully!' : 'Category added successfully!');
        setPrice('');
        setEditingId(null);
        fetchCategories(); 
      } else {
        setMessage('Failed to save category.');
      }
    } catch (error) {
      console.error('Error saving category:', error);
      setMessage('Network error while saving.');
    }
  };

  // Fills form for editing
  const handleEdit = (cat) => {
    setName(cat.name);
    setPrice(cat.price);
    setEditingId(cat._id);
    setMessage('');
  };

  // Handles Delete (DELETE)
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/seat-categories/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('Category deleted successfully!');
        if (editingId === id) {
          setEditingId(null);
          setPrice('');
        }
        fetchCategories();
      } else {
        setMessage('Failed to delete category.');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      setMessage('Network error while deleting.');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setPrice('');
    setName('Silver');
    setMessage('');
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">Manage Seat Categories & Pricing</h2>
      
      <form onSubmit={handleSubmit} className="mb-8 space-y-4 bg-slate-50 p-5 rounded-xl border border-slate-200">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-bold text-slate-700">
            {editingId ? 'Update Category Price' : 'Create New Category'}
          </h3>
          {editingId && (
            <button 
              type="button" 
              onClick={cancelEdit}
              className="text-xs text-rose-500 hover:text-rose-700 font-semibold cursor-pointer"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
            Select Tier
          </label>
          <select 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            disabled={!!editingId} // Disable tier change during edit so name remains consistent
            className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-amber-500 disabled:bg-slate-100 disabled:text-slate-500"
          >
            <option value="Silver">Silver</option>
            <option value="Gold">Gold</option>
            <option value="Platinum">Platinum</option>
            <option value="Recliner">Recliner</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
            Set Price ($)
          </label>
          <input 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            required 
            placeholder="e.g. 15.00"
            className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-amber-500"
          />
        </div>

        <button 
          type="submit" 
          className={`w-full font-bold py-2.5 rounded-lg text-sm transition-colors shadow-md cursor-pointer active:scale-95 mt-2 ${
            editingId 
              ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20' 
              : 'bg-amber-500 hover:bg-amber-400 text-black shadow-amber-500/20'
          }`}
        >
          {editingId ? 'Update Price' : 'Save Category'}
        </button>
      </form>

      {message && (
        <p className={`text-sm font-semibold mb-4 text-center ${message.includes('success') ? 'text-emerald-600' : 'text-rose-600'}`}>
          {message}
        </p>
      )}

      <hr className="border-slate-200 mb-6" />

      <h3 className="text-lg font-bold text-slate-800 mb-4">Current Pricing Tiers</h3>
      <ul className="space-y-3">
        {categories.length === 0 ? (
          <p className="text-sm text-slate-500">No categories set up yet.</p>
        ) : (
          categories.map((cat) => (
            <li key={cat._id} className="flex justify-between items-center bg-slate-50 border border-slate-200 px-4 py-3 rounded-lg hover:shadow-md transition-shadow">
              
              <div className="flex flex-col">
                <span className="font-semibold text-slate-700">{cat.name}</span>
                <span className="text-amber-600 font-bold">${cat.price.toFixed(2)}</span>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => handleEdit(cat)}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-1.5 rounded text-xs font-semibold transition-colors cursor-pointer"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(cat._id)}
                  className="bg-rose-100 hover:bg-rose-200 text-rose-700 px-3 py-1.5 rounded text-xs font-semibold transition-colors cursor-pointer"
                >
                  Delete
                </button>
              </div>

            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default SeatCategories;