import React from 'react'
import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { client } from '@/sanity/lib/client';
import { STARTUPS_QUERY } from '@/sanity/lib/queries';
import { StartupTypeCard } from '@/sanity.types';
import { sanityFetch, SanityLive } from '@/lib/live';
import { auth } from '@/auth';

const Home = async ({searchParams} : {searchParams: Promise<{query? :string}>}) => {
    const query = (await searchParams).query;
    const params = {search: query || null};
    // const posts = await client.fetch(STARTUPS_QUERY);
    const {data: posts} = await sanityFetch({query: STARTUPS_QUERY, params}) // revalidates the page as soon as it gets new data
    const session = await auth();
    console.log(session, ' session');
    

    return (
        <>
        <section className={"pink_container"}>
            <h1 className={"heading"}>
                Pitch Your Startup, <br/> Connect With Entrepreneurs
            </h1>
            <p className={"sub-heading !max-w-3xl"}>
                Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
            </p>

            <SearchForm query={query}/>
        </section>
        <section className={"section_container"}>
            <p className={"text-30-bold"}>
                {query ? `Search results for "${query}"` : "All Startups"}
            </p>
            <ul className={"mt-7 card_grid"}>
                {posts.length > 0 ? (
                    posts.map((post: StartupTypeCard) => (
                        <StartupCard key={post._id} post={post}/>
                    ))
                ) : (
                    <p className={"no-result"}>No startups found!</p>
                )}
            </ul>
        </section>

        <SanityLive />
        </>
    )
}
export default Home
