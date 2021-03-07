import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Loyalty.css';

function SignIn() {
  const location = useLocation();
  const query = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const [name, setName] = useState(query.get('name') ?? '');
  const [email, setEmail] = useState(query.get('email') ?? '');

  async function submitHandler(event) {
    event.preventDefault();
    const result = await fetch('/api/loyalty/jwt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
      }),
    });

    const details = await result.json();

    window.location.href = `https://pay.google.com/gp/v/save/${details.token}`;
  }

  return (
    <div className="Loyalty">
      <section>
        <h1>Sign In</h1>
        <form onSubmit={submitHandler}>
          <fieldset>
            <label className="field">
              <span className="label">Name</span>
              <input
                type="text"
                value={name}
                onChange={event => setName(event.target.value)}
                required
                autoComplete="name"
                placeholder="Enter name..."
              />
            </label>
            <label className="field">
              <span className="label">Email address</span>
              <input
                type="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
                required
                autoComplete="email"
                placeholder="Enter email address..."
              />
            </label>
            <div className="buttons">
              <button className="button-primary">Sign in</button>
            </div>
          </fieldset>
        </form>
      </section>
    </div>
  );
}

export default SignIn;
