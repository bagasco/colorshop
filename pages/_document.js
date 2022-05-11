import { Html, Head, Main, NextScript } from 'next/document'

export default function Document(){
    return (
        <Html>
            <Head>
                <link rel="shortcut icon" href="/rgb.png"/>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
                <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css' integrity='sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==' crossOrigin='anonymous' referrerPolicy='no-referrer' />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}