import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang='ru'>
            <Head >
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous' />
                <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;700&display=swap" rel="stylesheet" />
            </Head>
            <body>
                <Main />
                <div id="modal" />
                <div id='notification' />
                <NextScript />
            </body>
        </Html>
    )
}