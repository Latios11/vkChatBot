import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

function App() {
  const [userQuestion, setUserQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  // Initialize GoogleGenerativeAI with the API key from environment variables
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_APIKEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  async function Reply() {
    try {
      setIsLoading(true)
      setResponse('')
      // Generate content using the model
      const result = await model.generateContent(userQuestion);
      // Assuming `result` contains the response text
      setResponse(result.response.text);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setResponse('An error occurred while fetching the response.');
    }
    finally{
      setIsLoading(false)
    }
  }

  return (
    <div className='app'>
      <h1 className='header'>Ask Gemini AI</h1>
      <div className="container">
      <div className="form">
      <textarea className='input-box'
        type="text"
        value={userQuestion}
        onChange={(e) => setUserQuestion(e.target.value)}
        placeholder="Ask a question"
      />
      
      <button className='submit-btn' onClick={Reply}>{isLoading ? 'Loading...': 'Submit'}</button>

      </div>
    <div className='solution'>
      {response && (
          <p>{response}</p>
      )}
    </div>  
    </div>
    </div>
  );
}

export default App;
