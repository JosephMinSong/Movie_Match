import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metadata = {
    title: "Movie Match",
    description: 'Spend less time deciding, more time watching'
}

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body>
                <Provider>
                    <main>
                        <Nav />
                        { children }
                    </main>
                </Provider>
            </body>
        </html>
    )
}