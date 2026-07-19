import { createContext, useContext, useState, useEffect } from 'react'
// baaki sab same rehne
const StoreContext = createContext();

export function StoreProvider({ children }) {
  // ── CART ──────────────────────────────────────────────
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('noir_cart')) || []; }
    catch { return []; }
  });

  // ── WISHLIST ──────────────────────────────────────────
  const [wishlist, setWishlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem('noir_wishlist')) || []; }
    catch { return []; }
  });

  // ── AUTH ──────────────────────────────────────────────
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('noir_user')) || null; }
    catch { return null; }
  });

  // Persist to localStorage
  useEffect(() => { localStorage.setItem('noir_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('noir_wishlist', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem('noir_user', JSON.stringify(user)); }, [user]);

  // ── CART ACTIONS ──────────────────────────────────────
  const addToCart = (product, size = 'M', qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id && i.size === size);
      if (existing) {
        return prev.map(i =>
          i.id === product.id && i.size === size
            ? { ...i, qty: i.qty + qty }
            : i
        );
      }
      return [...prev, { ...product, size, qty }];
    });
  };

  const removeFromCart = (id, size) => {
    setCart(prev => prev.filter(i => !(i.id === id && i.size === size)));
  };

  const updateQty = (id, size, qty) => {
    if (qty < 1) { removeFromCart(id, size); return; }
    setCart(prev => prev.map(i =>
      i.id === id && i.size === size ? { ...i, qty } : i
    ));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  // ── WISHLIST ACTIONS ──────────────────────────────────
  const toggleWishlist = (product) => {
    setWishlist(prev =>
      prev.find(i => i.id === product.id)
        ? prev.filter(i => i.id !== product.id)
        : [...prev, product]
    );
  };

  const isWishlisted = (id) => wishlist.some(i => i.id === id);

  // ── AUTH ACTIONS ──────────────────────────────────────
  const login = (email, password) => {
    // Simple local auth — replace with real API call
    const stored = JSON.parse(localStorage.getItem('noir_users') || '[]');
    const found = stored.find(u => u.email === email && u.password === password);
    if (found) { setUser(found); return { success: true }; }
    return { success: false, message: 'Invalid email or password.' };
  };

  const register = (name, email, password) => {
    const stored = JSON.parse(localStorage.getItem('noir_users') || '[]');
    if (stored.find(u => u.email === email)) {
      return { success: false, message: 'Email already registered.' };
    }
    const newUser = { id: Date.now(), name, email, password };
    localStorage.setItem('noir_users', JSON.stringify([...stored, newUser]));
    setUser(newUser);
    return { success: true };
  };

  const logout = () => setUser(null);

  return (
    <StoreContext.Provider value={{
      cart, addToCart, removeFromCart, updateQty, clearCart, cartTotal, cartCount,
      wishlist, toggleWishlist, isWishlisted,
      user, login, register, logout,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);