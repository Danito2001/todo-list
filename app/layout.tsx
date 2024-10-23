import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TodoLayout } from "@/components/TodoLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({children}: {children: React.ReactNode}) {

	const LayoutWithRedux = ({children}: {children: React.ReactNode}) => {
		return <TodoLayout>{children}</TodoLayout>
	}	

	return (

		<html lang="en">
			<body className={inter.className}>
				<LayoutWithRedux>{children}</LayoutWithRedux>
			</body>
		</html>

	);
}
