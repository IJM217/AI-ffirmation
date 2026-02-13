import { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [feeling, setFeeling] = useState('');
  const [affirmation, setAffirmation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Apply theme class to body
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
  } else {
    document.body.classList.add('light-mode');
    document.body.classList.remove('dark-mode');
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setAffirmation('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
      const response = await fetch(`${apiUrl}/api/affirmation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, feeling }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate affirmation');
      }

      const data = await response.json();
      setAffirmation(data.affirmation);
    } catch (err) {
      setError('Something went wrong. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="app-banner">AI-ffirmation</h1>
      <div className="card">
        <header>
          <h2>Daily Affirmation</h2>
          <p>Share how you feel, and receive a personal affirmation.</p>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="feeling">How are you feeling?</label>
            <textarea
              id="feeling"
              value={feeling}
              onChange={(e) => setFeeling(e.target.value)}
              placeholder="e.g. Anxious about a presentation..."
              required
              rows={3}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Generating...' : 'Get Affirmation'}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {affirmation && (
          <div className="result fade-in">
            <h3>Your Affirmation</h3>
            <p>{affirmation}</p>
          </div>
        )}
      </div>

      <button className="theme-toggle" onClick={toggleTheme} title="Toggle Theme">
        {isDarkMode ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        )}
      </button>
    </div>
  );
}

export default App;
