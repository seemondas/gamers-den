import { useState, useEffect } from "react";

const PRODUCTS = [
  // Peripherals
  { id: 1, name: "Razer DeathAdder V3", category: "Peripherals", price: 79.99, tag: "Best Seller", desc: "Ultra-lightweight ergonomic gaming mouse, 30K DPI optical sensor.", emoji: "🖱️" },
  { id: 2, name: "Corsair K95 RGB Platinum", category: "Peripherals", price: 189.99, tag: "Top Rated", desc: "Cherry MX Speed switches, per-key RGB, dedicated macro keys.", emoji: "⌨️" },
  { id: 3, name: "SteelSeries Arctis Nova Pro", category: "Peripherals", price: 249.99, tag: "New", desc: "Hi-res audio, active noise cancellation, dual-wireless system.", emoji: "🎧" },
  { id: 4, name: "Logitech G640 XL Mousepad", category: "Peripherals", price: 34.99, tag: null, desc: "Large cloth surface optimized for gaming-grade optical sensors.", emoji: "🟫" },
  // PC Components
  { id: 5, name: "NVIDIA RTX 4080 Super", category: "PC Components", price: 999.99, tag: "Hot", desc: "16GB GDDR6X, 4K gaming, ray tracing & DLSS 3.5 support.", emoji: "🎮" },
  { id: 6, name: "AMD Ryzen 9 7950X", category: "PC Components", price: 549.99, tag: "Top Rated", desc: "16-core, 32-thread powerhouse with Zen 4 architecture, 5.7GHz boost.", emoji: "⚙️" },
  { id: 7, name: "Corsair Vengeance 32GB DDR5", category: "PC Components", price: 129.99, tag: null, desc: "6000MHz CL36, optimized for AMD EXPO & Intel XMP 3.0.", emoji: "💾" },
  { id: 8, name: "Samsung 990 Pro 2TB NVMe", category: "PC Components", price: 159.99, tag: "New", desc: "PCIe 4.0 SSD, 7450MB/s read, perfect for game storage.", emoji: "💿" },
  // Consoles & Controllers
  { id: 9, name: "PlayStation DualSense Edge", category: "Consoles & Controllers", price: 199.99, tag: "Best Seller", desc: "Customizable pro controller with adaptive triggers & back buttons.", emoji: "🕹️" },
  { id: 10, name: "Xbox Elite Series 2 Controller", category: "Consoles & Controllers", price: 179.99, tag: "Top Rated", desc: "Hall effect sticks, adjustable tension, 40hr battery life.", emoji: "🎯" },
  { id: 11, name: "Nintendo Switch Pro Controller", category: "Consoles & Controllers", price: 69.99, tag: null, desc: "Gyroscope, NFC amiibo support, 40hr battery, USB-C charging.", emoji: "🔵" },
  { id: 12, name: "8BitDo Ultimate 2.4G", category: "Consoles & Controllers", price: 49.99, tag: "New", desc: "Hall effect joysticks, 2.4G wireless, back buttons & charging dock.", emoji: "🕹️" },
  // Gaming Chairs & Desks
  { id: 13, name: "Secretlab Titan Evo 2025", category: "Gaming Chairs & Desks", price: 499.99, tag: "Best Seller", desc: "4-way lumbar support, cold-cure foam, magnetic head pillow.", emoji: "🪑" },
  { id: 14, name: "Autonomous SmartDesk Pro", category: "Gaming Chairs & Desks", price: 649.99, tag: "Top Rated", desc: "Electric L-shaped standing desk, 4 memory settings, cable management.", emoji: "🗂️" },
  { id: 15, name: "Ergotron LX Dual Monitor Arm", category: "Gaming Chairs & Desks", price: 219.99, tag: null, desc: "Full-motion dual arm, supports up to 2×25lbs, VESA compatible.", emoji: "🖥️" },
  { id: 16, name: "Elgato Multi Mount System", category: "Gaming Chairs & Desks", price: 129.99, tag: "New", desc: "Modular desk mounting system for lights, mic, webcam & accessories.", emoji: "🔩" },
];

const CATEGORIES = ["All", "Peripherals", "PC Components", "Consoles & Controllers", "Gaming Chairs & Desks"];

const TAG_COLORS = {
  "Best Seller": { bg: "#1a1a1a", text: "#ffffff" },
  "Top Rated":   { bg: "#2d6a4f", text: "#ffffff" },
  "Hot":         { bg: "#c1440e", text: "#ffffff" },
  "New":         { bg: "#1a5276", text: "#ffffff" },
};

// ─── Utilities ───────────────────────────────────────────────────────────────
function validateEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }
function validatePassword(p) { return p.length >= 6; }

// ─── Styles ──────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #f6f5f3;
    --surface: #ffffff;
    --surface2: #f0eeeb;
    --border: #e2deda;
    --text: #1c1b19;
    --muted: #8a8580;
    --accent: #1c1b19;
    --accent-hover: #3a3835;
    --danger: #c1440e;
    --success: #2d6a4f;
    --radius: 12px;
    --shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04);
    --shadow-lg: 0 8px 32px rgba(0,0,0,0.10);
  }

  body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); }

  .serif { font-family: 'DM Serif Display', serif; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 99px; }

  /* Fade in */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-up { animation: fadeUp 0.4s ease both; }

  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to   { transform: translateX(0); opacity: 1; }
  }
  .slide-in { animation: slideIn 0.3s cubic-bezier(0.22,1,0.36,1) both; }

  @keyframes pulse {
    0%,100% { transform: scale(1); }
    50% { transform: scale(1.15); }
  }

  /* Inputs */
  .input {
    width: 100%; padding: 11px 14px;
    border: 1.5px solid var(--border);
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    background: var(--surface);
    color: var(--text);
    transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
  }
  .input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(28,27,25,0.08); }
  .input.error { border-color: var(--danger); }

  /* Buttons */
  .btn-primary {
    width: 100%; padding: 12px;
    background: var(--accent); color: #fff;
    border: none; border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; font-weight: 600;
    cursor: pointer; transition: background 0.2s, transform 0.1s;
    letter-spacing: 0.02em;
  }
  .btn-primary:hover { background: var(--accent-hover); }
  .btn-primary:active { transform: scale(0.98); }

  .btn-ghost {
    background: none; border: 1.5px solid var(--border);
    border-radius: 8px; padding: 8px 16px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 500; color: var(--text);
    cursor: pointer; transition: background 0.15s, border-color 0.15s;
  }
  .btn-ghost:hover { background: var(--surface2); border-color: var(--text); }

  /* Product card */
  .product-card {
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: var(--radius);
    padding: 20px;
    display: flex; flex-direction: column; gap: 10px;
    transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
    cursor: default;
    position: relative;
    overflow: hidden;
  }
  .product-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
    border-color: #c8c4bf;
  }

  /* Cart badge */
  .cart-badge {
    position: absolute; top: -5px; right: -5px;
    background: var(--accent); color: #fff;
    border-radius: 99px; width: 18px; height: 18px;
    font-size: 10px; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    animation: pulse 0.3s ease;
  }
`;

// ─── Auth Screen ──────────────────────────────────────────────────────────────
function AuthScreen({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: null })); };

  const validate = () => {
    const e = {};
    if (mode === "signup" && !form.name.trim()) e.name = "Name is required";
    if (!validateEmail(form.email)) e.email = "Enter a valid email";
    if (!validatePassword(form.password)) e.password = "Password must be at least 6 characters";
    if (mode === "signup" && form.password !== form.confirm) e.confirm = "Passwords do not match";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitted(true);
    setTimeout(() => {
      onAuth({ name: form.name || form.email.split("@")[0], email: form.email });
    }, 600);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", background: "var(--bg)" }}>
      <div className="fade-up" style={{ width: "100%", maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <div style={{ width: 36, height: 36, background: "var(--accent)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 18 }}>🎮</span>
            </div>
            <span className="serif" style={{ fontSize: 26, letterSpacing: "-0.02em" }}>Gamers Den</span>
          </div>
          <p style={{ color: "var(--muted)", fontSize: 13 }}>Your setup starts here.</p>
        </div>

        {/* Card */}
        <div style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 16, padding: "32px 28px", boxShadow: "var(--shadow)" }}>
          {/* Tabs */}
          <div style={{ display: "flex", borderBottom: "1.5px solid var(--border)", marginBottom: 28 }}>
            {["login", "signup"].map(m => (
              <button key={m} onClick={() => { setMode(m); setErrors({}); setSubmitted(false); }} style={{
                flex: 1, padding: "10px 0", background: "none", border: "none",
                borderBottom: mode === m ? "2px solid var(--accent)" : "2px solid transparent",
                marginBottom: -1.5,
                fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: mode === m ? 600 : 400,
                color: mode === m ? "var(--text)" : "var(--muted)", cursor: "pointer",
                textTransform: "capitalize", transition: "color 0.2s"
              }}>
                {m === "login" ? "Log In" : "Sign Up"}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {mode === "signup" && (
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Full Name</label>
                <input className={`input ${errors.name ? "error" : ""}`} placeholder="John Doe" value={form.name} onChange={e => set("name", e.target.value)} />
                {errors.name && <p style={{ color: "var(--danger)", fontSize: 12, marginTop: 4 }}>{errors.name}</p>}
              </div>
            )}
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Email</label>
              <input className={`input ${errors.email ? "error" : ""}`} type="email" placeholder="you@example.com" value={form.email} onChange={e => set("email", e.target.value)} />
              {errors.email && <p style={{ color: "var(--danger)", fontSize: 12, marginTop: 4 }}>{errors.email}</p>}
            </div>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Password</label>
              <input className={`input ${errors.password ? "error" : ""}`} type="password" placeholder="••••••••" value={form.password} onChange={e => set("password", e.target.value)} />
              {errors.password && <p style={{ color: "var(--danger)", fontSize: 12, marginTop: 4 }}>{errors.password}</p>}
            </div>
            {mode === "signup" && (
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Confirm Password</label>
                <input className={`input ${errors.confirm ? "error" : ""}`} type="password" placeholder="••••••••" value={form.confirm} onChange={e => set("confirm", e.target.value)} />
                {errors.confirm && <p style={{ color: "var(--danger)", fontSize: 12, marginTop: 4 }}>{errors.confirm}</p>}
              </div>
            )}

            <button className="btn-primary" onClick={handleSubmit} disabled={submitted} style={{ marginTop: 4, opacity: submitted ? 0.6 : 1 }}>
              {submitted ? "Loading…" : mode === "login" ? "Log In" : "Create Account"}
            </button>
          </div>
        </div>

        <p style={{ textAlign: "center", fontSize: 12, color: "var(--muted)", marginTop: 20 }}>
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <span style={{ color: "var(--text)", fontWeight: 600, cursor: "pointer", textDecoration: "underline" }} onClick={() => { setMode(mode === "login" ? "signup" : "login"); setErrors({}); }}>
            {mode === "login" ? "Sign up" : "Log in"}
          </span>
        </p>
      </div>
    </div>
  );
}

// ─── Cart Sidebar ─────────────────────────────────────────────────────────────
function CartSidebar({ cart, onClose, onUpdate, onCheckout }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.25)", backdropFilter: "blur(2px)" }} />
      <div className="slide-in" style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "min(420px, 95vw)", background: "var(--surface)", boxShadow: "-8px 0 40px rgba(0,0,0,0.12)", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div style={{ padding: "20px 24px", borderBottom: "1.5px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 className="serif" style={{ fontSize: 22 }}>Cart <span style={{ fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: "var(--muted)", fontWeight: 400 }}>({cart.reduce((s, i) => s + i.qty, 0)} items)</span></h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "var(--muted)", lineHeight: 1 }}>✕</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "var(--muted)" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🛒</div>
              <p style={{ fontWeight: 500 }}>Your cart is empty</p>
              <p style={{ fontSize: 13, marginTop: 4 }}>Add some gear to get started</p>
            </div>
          ) : cart.map(item => (
            <div key={item.id} style={{ display: "flex", gap: 14, alignItems: "center", padding: "12px", background: "var(--surface2)", borderRadius: 10, border: "1.5px solid var(--border)" }}>
              <span style={{ fontSize: 28 }}>{item.emoji}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 600, fontSize: 13, lineHeight: 1.3, marginBottom: 2 }}>{item.name}</p>
                <p style={{ color: "var(--muted)", fontSize: 12 }}>${item.price.toFixed(2)}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button onClick={() => onUpdate(item.id, item.qty - 1)} style={{ width: 26, height: 26, borderRadius: 6, border: "1.5px solid var(--border)", background: "var(--surface)", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                <span style={{ fontSize: 14, fontWeight: 600, minWidth: 18, textAlign: "center" }}>{item.qty}</span>
                <button onClick={() => onUpdate(item.id, item.qty + 1)} style={{ width: 26, height: 26, borderRadius: 6, border: "1.5px solid var(--border)", background: "var(--surface)", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ padding: "20px 24px", borderTop: "1.5px solid var(--border)", display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "var(--muted)", fontSize: 14 }}>Subtotal</span>
              <span style={{ fontWeight: 700, fontSize: 20, fontFamily: "'DM Serif Display', serif" }}>${total.toFixed(2)}</span>
            </div>
            <button className="btn-primary" onClick={onCheckout}>Proceed to Checkout →</button>
            <p style={{ fontSize: 11, color: "var(--muted)", textAlign: "center" }}>Free shipping on orders over $75</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Order Success ────────────────────────────────────────────────────────────
function OrderSuccess({ total, onContinue }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)", padding: 24 }}>
      <div className="fade-up" style={{ textAlign: "center", maxWidth: 420 }}>
        <div style={{ width: 72, height: 72, background: "#e8f5ed", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 32 }}>✓</div>
        <h2 className="serif" style={{ fontSize: 32, marginBottom: 10 }}>Order Confirmed!</h2>
        <p style={{ color: "var(--muted)", marginBottom: 8 }}>Your gear is on its way. We'll send a confirmation email shortly.</p>
        <p style={{ fontWeight: 700, fontSize: 20, margin: "16px 0 28px", fontFamily: "'DM Serif Display', serif" }}>Total charged: ${total.toFixed(2)}</p>
        <button className="btn-primary" onClick={onContinue}>Continue Shopping</button>
      </div>
    </div>
  );
}

// ─── Store ────────────────────────────────────────────────────────────────────
function Store({ user, onLogout }) {
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [ordered, setOrdered] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);
  const [addedId, setAddedId] = useState(null);

  const filtered = PRODUCTS.filter(p =>
    (category === "All" || p.category === category) &&
    (search === "" || p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()))
  );

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const addToCart = (product) => {
    setCart(c => {
      const existing = c.find(i => i.id === product.id);
      if (existing) return c.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...c, { ...product, qty: 1 }];
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 800);
  };
  const updateCart = (id, qty) => {
    if (qty <= 0) setCart(c => c.filter(i => i.id !== id));
    else setCart(c => c.map(i => i.id === id ? { ...i, qty } : i));
  };
  const checkout = () => {
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    setOrderTotal(total);
    setCart([]);
    setCartOpen(false);
    setOrdered(true);
  };

  if (ordered) return <OrderSuccess total={orderTotal} onContinue={() => setOrdered(false)} />;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {/* Header */}
      <header style={{ background: "var(--surface)", borderBottom: "1.5px solid var(--border)", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 60, display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flex: "0 0 auto" }}>
            <div style={{ width: 30, height: 30, background: "var(--accent)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>🎮</div>
            <span className="serif" style={{ fontSize: 20 }}>Gamers Den</span>
          </div>

          {/* Search */}
          <div style={{ flex: 1, maxWidth: 400 }}>
            <input className="input" placeholder="Search products…" value={search} onChange={e => setSearch(e.target.value)} style={{ padding: "8px 14px", fontSize: 13 }} />
          </div>

          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 13, color: "var(--muted)" }}>Hi, <strong style={{ color: "var(--text)" }}>{user.name}</strong></span>
            <button className="btn-ghost" onClick={onLogout} style={{ padding: "6px 12px", fontSize: 12 }}>Log out</button>
            <button onClick={() => setCartOpen(true)} style={{ position: "relative", background: "var(--accent)", border: "none", borderRadius: 8, width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16 }}>
              🛒
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>
        {/* Hero */}
        <div className="fade-up" style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 20, padding: "40px 48px", marginBottom: 40, display: "flex", alignItems: "center", justifyContent: "space-between", overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", right: -20, top: -20, fontSize: 120, opacity: 0.06, transform: "rotate(-10deg)" }}>🎮</div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 8 }}>New Arrivals 2025</p>
            <h1 className="serif" style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.15, marginBottom: 12, maxWidth: 480 }}>Level Up Your<br />Gaming Setup</h1>
            <p style={{ color: "var(--muted)", fontSize: 14, maxWidth: 380 }}>Premium gear curated for serious gamers. Free shipping on orders over $75.</p>
          </div>
          <div style={{ fontSize: "clamp(60px, 8vw, 96px)", lineHeight: 1, flexShrink: 0 }}>🕹️</div>
        </div>

        {/* Category Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 28, overflowX: "auto", paddingBottom: 4 }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)} style={{
              padding: "8px 18px", borderRadius: 99, border: "1.5px solid",
              borderColor: category === cat ? "var(--accent)" : "var(--border)",
              background: category === cat ? "var(--accent)" : "var(--surface)",
              color: category === cat ? "#fff" : "var(--text)",
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: category === cat ? 600 : 400,
              cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.15s"
            }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p style={{ color: "var(--muted)", fontSize: 13, marginBottom: 20 }}>
          {filtered.length} product{filtered.length !== 1 ? "s" : ""}{category !== "All" ? ` in ${category}` : ""}
          {search ? ` matching "${search}"` : ""}
        </p>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--muted)" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <p style={{ fontWeight: 500 }}>No products found</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 18 }}>
            {filtered.map((p, i) => (
              <div key={p.id} className="product-card fade-up" style={{ animationDelay: `${i * 0.04}s` }}>
                {p.tag && (
                  <span style={{ position: "absolute", top: 12, right: 12, fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", padding: "3px 8px", borderRadius: 99, background: TAG_COLORS[p.tag].bg, color: TAG_COLORS[p.tag].text }}>
                    {p.tag}
                  </span>
                )}
                <div style={{ fontSize: 40, marginBottom: 4 }}>{p.emoji}</div>
                <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)" }}>{p.category}</p>
                <h3 style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.3 }}>{p.name}</h3>
                <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.5, flex: 1 }}>{p.desc}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
                  <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20 }}>${p.price.toFixed(2)}</span>
                  <button
                    onClick={() => addToCart(p)}
                    style={{
                      padding: "8px 16px", borderRadius: 8,
                      background: addedId === p.id ? "var(--success)" : "var(--accent)",
                      color: "#fff", border: "none",
                      fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600,
                      cursor: "pointer", transition: "background 0.25s, transform 0.1s",
                      transform: addedId === p.id ? "scale(0.97)" : "scale(1)"
                    }}
                  >
                    {addedId === p.id ? "✓ Added" : "Add to Cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {cartOpen && <CartSidebar cart={cart} onClose={() => setCartOpen(false)} onUpdate={updateCart} onCheckout={checkout} />}
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <style>{css}</style>
      {user ? <Store user={user} onLogout={() => setUser(null)} /> : <AuthScreen onAuth={setUser} />}
    </>
  );
}
