import React from 'react';
import { render, screen } from "@testing-library/react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Photo } from '../views'
import { BrowserRouter } from 'react-router-dom';

describe('The Photo page', () => {
    test("image renders", async () => {

        render(<GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
            <Photo />
        </GoogleOAuthProvider>, { wrapper: BrowserRouter }); // Test if the page renders accurately before any API calls or selections are made

        const photo = screen.getAllByRole("img");
        expect(photo).toHaveLength(1);
    })

    // Search button
    test("Search Button renders", () => {
        render(<GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
            <Photo />
        </GoogleOAuthProvider>, { wrapper: BrowserRouter });
        const searchBtn = screen.getByRole("button");
        expect(searchBtn.textContent).toBe("Update");
        expect(searchBtn).not.toBeDisabled();
    })
});
