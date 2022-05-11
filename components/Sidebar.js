import Link from "next/link";
import { useRouter } from "next/router";
import { useStateContext } from "../context/StateContext";
import React from "react";

export default function Sidebar(){
    const router = useRouter();
    const { tags } = useStateContext();
    return (
        <div className="fixed bg-white z-10 bottom-0 sm:left-0 sm:hide-scrollbar h-sidebar sm:overflow-y-auto sm:divide-y sm:px-6 w-full sm:w-[200px]">
            <section className="flex justify-around pt-2 sm:pt-0 sm:block pb-7 sm:pb-0 border-t sm:border-t-0">
                <Link href="/">
                    <a className={`flex flex-col sm:flex-row sm:mb-1.5 text-gray-500 group items-center sm:px-3 sm:py-2 sm:rounded-xl transition gap-1 sm:gap-1.5 ${router.pathname==='/' || router.pathname==='/[...all]' ? 'text-black sm:bg-gray-100 sm:hover:bg-gray-200' : 'sm:hover:bg-gray-100' }`}>
                        {router.pathname==='/' || router.pathname==='/[...all]' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        )}
                        <span className="group-hover:text-black transition text-xs sm:text-base">New</span>
                    </a>
                </Link>
                <Link href="/popular">
                    <a className={`flex flex-col sm:flex-row sm:mb-1.5 text-gray-500 group items-center sm:px-3 sm:py-2 sm:rounded-xl transition gap-1 sm:gap-1.5 ${router.pathname==='/popular' ? 'text-black sm:bg-gray-100 sm:hover:bg-gray-200' : 'sm:hover:bg-gray-50' }`}>
                        {router.pathname==='/popular' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 9H10a3 3 0 013 3v1a1 1 0 102 0v-1a5 5 0 00-5-5H8.414l1.293-1.293z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                            </svg>
                        )}
                        <span className="group-hover:text-black transition text-xs sm:text-base">Popular</span>
                    </a>
                </Link>
                <Link href="/random">
                    <a className={`flex flex-col sm:flex-row sm:mb-1.5 text-gray-500 group items-center sm:px-3 sm:py-2 sm:rounded-xl transition gap-1 sm:gap-1.5 ${router.pathname==='/random' ? 'text-black sm:bg-gray-100 sm:hover:bg-gray-200' : 'sm:hover:bg-gray-50' }`}>
                        {router.pathname==='/random' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                        )}
                        <span className="group-hover:text-black transition text-xs sm:text-base">Random</span>
                    </a>
                </Link>
                <Link href="/collection">
                    <a className={`flex flex-col sm:flex-row sm:mb-1.5 text-gray-500 group items-center sm:px-3 sm:py-2 sm:rounded-xl transition gap-1 sm:gap-1.5 ${router.pathname==='/collection' ? 'text-black sm:bg-gray-100 sm:hover:bg-gray-200' : 'sm:hover:bg-gray-50' }`}>
                        {router.pathname==='/collection' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        )}
                        <span className="group-hover:text-black transition text-xs sm:text-base">Collection</span>
                    </a>
                </Link>
            </section>
            <section className="hidden sm:block text-xs">
                {tags.filter(tag=>!tag.color)?.map(tag=>(
                    <Link key={tag._id} href={`/palettes/${tag.slug}`}>
                        <a className={`px-3 py-1.5 mt-2 mb-1.5 rounded-full transition block ${router.asPath===`/palettes/${tag.slug}` ? 'bg-gray-100 hover:bg-gray-200 text-black' : 'hover:bg-gray-50 hover:text-black'}`}>{tag.title}</a>
                    </Link>
                ))}
            </section>
        </div>
    )
}
