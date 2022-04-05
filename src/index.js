import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ProductsContextProvider } from './components/screens/ProductsContextProvider';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
  <ProductsContextProvider>
  
  
    <App />
    
    </ProductsContextProvider>,
  document.getElementById('root')
);
registerServiceWorker();
