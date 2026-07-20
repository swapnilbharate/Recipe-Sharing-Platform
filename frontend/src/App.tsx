import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { CreateRecipe } from './pages/CreateRecipe';
import { SavedRecipes } from './pages/SavedRecipes';
import { Auth } from './pages/Auth';
import { RecipeDetails } from './pages/RecipeDetails';
import { EditRecipe } from './pages/EditRecipe';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <Toaster position="top-center" toastOptions={{ duration: 3000, style: { background: '#FF6B00', color: '#fff', fontSize: '18px', padding: '16px 24px', fontWeight: 'bold' } }} />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/edit-recipe/:id" element={<EditRecipe />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;