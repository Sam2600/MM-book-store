import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import { Routes } from "./routes/Routes";
import { store } from './states/store';
import { Provider } from 'react-redux';
import { getNovels } from './states/features/novel/novelSlice';

store.dispatch(getNovels());

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={Routes} />
    </Provider>
  </StrictMode>,
)
