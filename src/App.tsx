import * as React from 'react';
import "./index.css"
import { Router } from "./Router";
import { DataContextProvider } from './DataContext';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient();
const env : string = process.env.NODE_ENV!;
console.info( env );

function App() {
  return (
    <div className="bg-gray-700 text-white h-screen">
      <QueryClientProvider client={queryClient}>
        <DataContextProvider >
          <Router />
        </DataContextProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
