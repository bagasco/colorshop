import Head from 'next/head';

export default function Layout({children, title}){
    return (
        <>
        <Head>
            <title>{title}</title>
        </Head>
        {children}
        </>
    )
}