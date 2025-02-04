import React from 'react'
import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

const Home = async ({searchParams} : {searchParams: Promise<{query? :string}>}) => {
    const query = (await searchParams).query;

    const posts = [
        {
            _createdAt: new Date(),
            views: "55",
            author: {_id: 1, name: "Erdit"},
            _id: 1,
            description: "Description",
            image: "https://media.istockphoto.com/id/1322104312/photo/freedom-chains-that-transform-into-birds-charge-concept.jpg?s=612x612&w=0&k=20&c=e2XUx498GotTLJn_62tPmsqj6vU48ZEkf0auXi6Ywh0=",
            title: "Titulli i startupit",
            category: "Tech"
        }
    ]

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
                    posts.map((post: StartupCardType) => (
                        <StartupCard key={post} post={post}/>
                    ))
                ) : (
                    <p className={"no-result"}>No startups found!</p>
                )}
            </ul>
        </section>
        </>
    )
}
export default Home
