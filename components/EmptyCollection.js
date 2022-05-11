import Link from "next/link";

export default function EmptyCollection(){
    return (
        <div className="pt-20">
            <div className="mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <h1 className="text-center font-medium text-lg mb-2">No palettes in collection</h1>
                <p className="text-center text-xs text-gray-500 mb-8">You haven't liked anything yet!</p>
                <Link href={`/popular`}>
                    <a className="block w-max mx-auto text-xs sm:text-sm px-4 py-2 border rounded-lg">Find beutiful palettes</a>
                </Link>
            </div>
        </div>
    )
}