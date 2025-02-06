import { StartupTypeCard } from '@/sanity.types'
import { client } from '@/sanity/lib/client'
import { STARTUPS_BY_AUTHOR_QUERY } from '@/sanity/lib/queries'
import React from 'react'
import StartupCard from './StartupCard'

const UserStartups = async ({id} : {id: string}) => {
    const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, {id})
  return (
    <>
        {startups.length > 0 ? (
            startups.map((post: StartupTypeCard) => (
                <StartupCard key={post._id} post={post} />
            ))
        ) : (
            <p className="no-result">No startups yet</p>
        )}
    </>
  )
}

export default UserStartups