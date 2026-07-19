import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export default function Login() {
  const { login } = useStore();
  const navigate = useNavigate();
  const [form, setForm]   = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(form.email, form.password);
    if (result.success) navigate('/');
    else setError(result.message);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">NOIR</div>
        <div className="section-label" style={{ justifyContent: 'center', marginBottom: '8px' }}>Welcome Back</div>
        <h2 className="auth-title">Sign <em>In</em></h2>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input type="email" required placeholder="your@email.com"
              value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" required placeholder="••••••••"
              value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '18px', marginTop: '8px' }}>
            Sign In
          </button>
        </form>

        <p className="auth-switch">
          New to Noir? <Link to="/register">Create Account</Link>
        </p>
      </div>
    </div>
  );
}