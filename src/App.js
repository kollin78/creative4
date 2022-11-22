import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [quotes, setQuotes] = useState([]);
  const [error, setError] = useState("");
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const fetchQuotes = async () => {
    try {
      const response = await axios.get("/api/quotes");
      setQuotes(response.data.quotes);
    }
    catch (error) {
      setError("error retrieving quotes: " + error);
    }
  }

  const createQuote = async () => {
    try {
      await axios.post("/api/quotes", { quote: quote, author: author });
    }
    catch (error) {
      setError("error adding a quote: " + error);
    }
  }

  // fetch ticket data
  useEffect(() => {
    fetchQuotes();
  }, []);

  const addQuote = async (e) => {
    e.preventDefault();
    await createQuote();
    fetchQuotes();
    setQuote("");
    setAuthor("");
  }

  const deleteOneQuote = async (quote) => {
    try {
      await axios.delete("/api/quotes/" + quote.author);
    }
    catch (error) {
      setError("error deleting a quote" + error);
    }
  }


  const deleteQuote = async (quote) => {
    await deleteOneQuote(quote);
    fetchQuotes();
  }

  return (
    <div class="App">
      <div class="lil-box">
        {error}
        <h1>Create a Memorable Quote</h1>
        <form onSubmit={addQuote}>
          <div class="input">
            <label class="label">
              <b>Quote: </b><input class="in-box" type="text" value={quote} onChange={e => setQuote(e.target.value)} />
            </label>
          </div>
          <div class="input">
            <label class="label">
              <b>Author: </b><input class="in-box" value={author} onChange={e=>setAuthor(e.target.value)}></input>
            </label>
          </div>
          <input class="in-button" type="submit" value="Submit" />
        </form>
        <h1>Quotes</h1>
        {quotes.map( quote => (
          <div key={quote.author} className="ticket">
            <div className="problem">
              <p>"{quote.quote}"</p>
              <p><i>-- {quote.author}</i></p>
            </div>
            <button onClick={e => deleteQuote(quote)}>Delete</button>
          </div>
      ))}     
      </div>
    </div>
  );
}

export default App;
