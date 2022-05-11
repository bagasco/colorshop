import Link from 'next/link';

export default function EmptyPalette(){
    return (
        <div className='py-10'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-11 text-gray-500 mx-auto w-11 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h1 className='text-center font-medium text-lg mb-3'>No results</h1>
            <p className='text-center text-xs'>We couldn’t find any palette matching your search</p>
            <Link href='/'>
                <a className='block mx-auto w-max mt-8 border transition hover:bg-gray-50 rounded-xl text-sm px-4 py-2'>Back home</a>
            </Link>
        </div>
    )
}