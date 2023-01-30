// whether the fruit list includes 3 items,
// whether the h1 tag exists,
// whether the span tag contains the sum of variables a and b.
import React from 'react';
import { render, screen } from '@testing-library/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Landing } from '../views'
import { BrowserRouter } from "react-router-dom"

test('title should be rendered', () => {
  render(<GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
    <Landing />
  </GoogleOAuthProvider>
    , { wrapper: BrowserRouter });
  const linkElement = screen.getByText(/Savannah and a picture Galore/i);
  expect(linkElement).toBeInTheDocument();
})
