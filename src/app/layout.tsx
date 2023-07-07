import "@/styles/globals.css"

export const metadata = {
	title: "Sudut Pandang",
	description: "Menumbuhkan Dialog, Merangkul Perspektif",
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	)
}
