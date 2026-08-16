import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Herro";
import FontShowcase from "./components/Retangle";
import Product from "./components/products";
import Top_sell from "./components/Top_sell";
import Dress from "./components/dress";
import CustomerCarousel from "./components/Customer";
import Footer from "./components/Footer";
import CasualPage from "./pages/CasualPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import BrandsPage from "./pages/BrandsPage";
import AuthModal from "./components/AuthModal";
import AddProductModal from "./components/AddProductModal";

const API = "http://localhost:4000";

export default function App() {
  const [currentView, setCurrentView] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  const [authOpen, setAuthOpen] = useState(false);
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API}/products`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      }
    } catch (e) {
      // Backend not running or error - products fallback in components will handle gracefully
    }
  };

  const fetchCart = async (uid) => {
    if (!uid) return;
    try {
      const res = await fetch(`${API}/cart/${uid}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setCart(data);
          localStorage.setItem("cart", JSON.stringify(data));
        }
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (user?.uid) {
      fetchCart(user.uid);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleSignup = async (email, password) => {
    const res = await fetch(`${API}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Signup failed");
    if (data.user) {
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    setAuthOpen(false);
  };

  const handleLogin = async (email, password) => {
    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login failed");
    if (data.user) {
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    setAuthOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setCart([]);
    localStorage.removeItem("cart");
    setCurrentView("home");
  };

  const handleAddProduct = async (name, price) => {
    if (!user) {
      setAuthOpen(true);
      return;
    }
    const res = await fetch(`${API}/products/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price: Number(price), userId: user.uid }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to add product");
    fetchProducts();
    setAddProductOpen(false);
  };

  const handleAddToCart = async (item) => {
    const newItem = {
      uuid: Math.floor(1000 + Math.random() * 9000),
      id: item.id || item._id,
      name: item.name,
      price: Number(item.price),
      qty: Number(item.qty) || 1,
      image: item.image || "/images/might1.png",
      color: item.color || "Black",
      size: item.size || "Large",
      discount: item.discount || 0,
    };

    setCart((prev) => {
      const existing = prev.find(
        (p) =>
          p.id === newItem.id &&
          p.color === newItem.color &&
          p.size === newItem.size
      );
      if (existing) {
        return prev.map((p) =>
          p.uuid === existing.uuid
            ? { ...p, qty: p.qty + newItem.qty }
            : p
        );
      }
      return [...prev, newItem];
    });

    if (user?.uid) {
      try {
        await fetch(`${API}/cart/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId: newItem.id,
            name: newItem.name,
            price: newItem.price,
            quantity: newItem.qty,
            userId: user.uid,
          }),
        });
      } catch (e) {}
    }
  };

  const handleUpdateCartQty = (uuidOrId, qty) => {
    setCart((prev) =>
      prev.map((item) =>
        item.uuid === uuidOrId || item.id === uuidOrId
          ? { ...item, qty: Math.max(1, qty) }
          : item
      )
    );
  };

  const handleRemoveFromCart = async (uuidOrId) => {
    setCart((prev) =>
      prev.filter((item) => item.uuid !== uuidOrId && item.id !== uuidOrId)
    );

    if (user?.uid) {
      try {
        await fetch(`${API}/cart/remove/${uuidOrId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.uid }),
        });
      } catch (e) {}
    }
  };

  const handleSelectProduct = (prod) => {
    setSelectedProduct(prod);
    setCurrentView("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-gray-900 font-sans">
      <Header
        cart={cart}
        user={user}
        onNavigate={handleNavigate}
        onOpenAuth={() => setAuthOpen(true)}
        onLogout={handleLogout}
        onOpenAddProduct={() =>
          user ? setAddProductOpen(true) : setAuthOpen(true)
        }
        onSearch={setSearchQuery}
      />

      <main className="flex-grow">
        {currentView === "home" && (
          <div>
            <Hero onNavigate={handleNavigate} />
            <FontShowcase />
            <Product
              products={products}
              onSelectProduct={handleSelectProduct}
              onNavigate={handleNavigate}
            />
            <Top_sell
              products={products}
              onSelectProduct={handleSelectProduct}
              onNavigate={handleNavigate}
            />
            <Dress onNavigate={handleNavigate} />
            <CustomerCarousel />
          </div>
        )}

        {currentView === "casual" && (
          <CasualPage
            products={products}
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === "detail" && (
          <ProductDetailPage
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === "cart" && (
          <CartPage
            cart={cart}
            onUpdateQty={handleUpdateCartQty}
            onRemoveItem={handleRemoveFromCart}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === "brands" && (
          <BrandsPage onNavigate={handleNavigate} />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />

      <AddProductModal
        isOpen={addProductOpen}
        onClose={() => setAddProductOpen(false)}
        onAddProduct={handleAddProduct}
      />
    </div>
  );
}
