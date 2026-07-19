import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export default function Register() {
  const { register } = useStore();
  const navigate = useNavigate();
  const [form, setForm]   = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    if (form.password.length < 6)       { setError('Password must be at least 6 characters.'); return; }
    const result = register(form.name, form.email, form.password);
    if (result.success) navigate('/');
    else setError(result.message);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">NOIR</div>
        <div className="section-label" style={{ justifyContent: 'center', marginBottom: '8px' }}>Join Noir</div>
        <h2 className="auth-title">Create <em>Account</em></h2>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <input required placeholder="Jane Doe"
              value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" required placeholder="your@email.com"
              value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" required placeholder="Min. 6 characters"
              value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" required placeholder="Repeat password"
              value={form.confirm} onChange={e => setForm({...form, confirm: e.target.value})} />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '18px', marginTop: '8px' }}>
            Create Account
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}