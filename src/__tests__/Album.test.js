import React from 'react';
import { render, waitFor, screen } from "@testing-library/react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Album } from '../views'
import axios from "axios";
import { BrowserRouter } from 'react-router-dom';


jest.mock("axios");

const dummyPhotos = [
    {
        albumId: 1,
        id: 1,
        title: "accusamus beatae ad facilis cum similique qui sunt",
        url: "https://via.placeholder.com/600/92c952",
        thumbnailUrl: "https://via.placeholder.com/150/92c952"
    },
    {
        albumId: 1,
        id: 2,
        title: "reprehenderit est deserunt velit ipsam",
        url: "https://via.placeholder.com/600/771796",
        thumbnailUrl: "https://via.placeholder.com/150/771796"
    },
    {
        albumId: 1,
        id: 3,
        title: "officia porro iure quia iusto qui ipsa ut modi",
        url: "https://via.placeholder.com/600/24f355",
        thumbnailUrl: "https://via.placeholder.com/150/24f355"
    },
    {
        albumId: 1,
        id: 4,
        title: "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
        url: "https://via.placeholder.com/600/d32776",
        thumbnailUrl: "https://via.placeholder.com/150/d32776"
    },
];
describe('The Album page', () => {
    test("has an photos list", async () => {
        axios.get.mockResolvedValue({ data: dummyPhotos });
        render(<GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
            <Album />
        </GoogleOAuthProvider>, { wrapper: BrowserRouter });

        const photosList = await waitFor(() => screen.findAllByTestId("photo"));
        expect(photosList).toHaveLength(4);
    })
});
