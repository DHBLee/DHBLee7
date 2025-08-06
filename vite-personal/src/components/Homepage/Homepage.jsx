import React from 'react'
import Socials from '../../UI/Socials'
import { information } from '../../util/data'
import { Link } from 'react-router-dom'

const Homepage = () => {
  return (
    <>
    <section>
        <h1>Hi, I'm Paulina</h1>
        <p>I’m on a journey to become a front-end web developer. I love building little projects, trying out new coding techniques, and sharing what I learn along the way. When I’m not at my desk, you’ll find me reading, hiking through the mountains, or challenging myself on rock-climbing walls. I started this blog to document my progress, keep myself accountable, and hopefully inspire anyone else who’s learning to code. Welcome to my corner of the internet, and thanks for stopping by!</p>
        <Socials padding={true}/>
    </section>
    <hr />
    <article className='flex flex-col gap-8 py-[32px]'>
        <h2>Latest Articles</h2>
        {information.slice(0, 5).map((article, index) => (
            <div key={index} className='flex flex-col gap-2'>
                <Link to={`/blog/${article.slug}`} className='flex flex-col gap-2'>
                  <h3>{article.title}</h3>
                  <p>{article.publishedAt}</p>
                </Link>
            </div>
        ))}
        <Link to="/blog">View all articles</Link>
    </article>
  </>
  )
}

export default Homepage