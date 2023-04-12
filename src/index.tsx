import React from 'react';
import { createRoot } from 'react-dom/client';

import { RouterProvider } from 'react-router-dom';
import router from './router';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

// 装载
root.render(<RouterProvider router={router} />);
