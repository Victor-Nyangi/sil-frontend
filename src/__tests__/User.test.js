import React from 'react';
import { render, waitFor, screen } from "@testing-library/react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { User } from '../views'
import axios from "axios";
import { BrowserRouter } from 'react-router-dom';


jest.mock("axios");

const dummyAlbums = [
    {
        userId: 1,
        id: 1,
        title: "quidem molestiae enim"
    },
    {
        userId: 1,
        id: 2,
        title: "sunt qui excepturi placeat culpa"
    },
    {
        userId: 1,
        id: 3,
        title: "omnis laborum odio"
    },
    {
        userId: 1,
        id: 4,
        title: "non esse culpa molestiae omnis sed optio"
    },
];
describe('The User page', () => {
    test("has an albums list and displays the correct title", async () => {
        axios.get.mockResolvedValue({ data: dummyAlbums });
        render(<GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
            <User />
        </GoogleOAuthProvider>, { wrapper: BrowserRouter }); // Test if the page renders accurately before any API calls or selections are made

        const albumList = await waitFor(() => screen.findAllByTestId("album"));

        const linkElement = screen.getByText(/Albums/i);
        expect(linkElement).toBeInTheDocument();
        expect(albumList).toHaveLength(4);
    })
});
