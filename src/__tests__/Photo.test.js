import React from 'react';
import { render, screen, waitFor } from "@testing-library/react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Photo } from '../views'
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';


jest.mock("axios");

const dummyPhoto = {
    albumId: 8,
    id: 353,
    title: "quia consequatur fugit atque est saepe",
    url: "https://via.placeholder.com/600/44e038",
    thumbnailUrl: "https://via.placeholder.com/150/44e038",
    photo_id: 353
}
describe('The Photo page', () => {
    test("image renders", async () => {
        axios.get.mockResolvedValue({ data: dummyPhoto });

        render(<GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
            <Photo />
        </GoogleOAuthProvider>, { wrapper: BrowserRouter });

        const photo = await waitFor(() => screen.findAllByRole("img"));
        expect(photo).toHaveLength(1);
    })
});
