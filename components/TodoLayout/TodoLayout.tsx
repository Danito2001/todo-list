'use client';

import { Provider } from 'react-redux'
import { NextUIProvider } from "@nextui-org/react";
import { store } from "@/store/store";
import { Navbar } from '../Navbar';



export default function TodoLayout({children}: {children: React.ReactNode}) {

	return (
        <div>
            <Provider store={store}>
                <Navbar/>
                <NextUIProvider>
                    {children}
                </NextUIProvider>
            </Provider>
        </div>
	);
}
