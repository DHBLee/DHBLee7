import React from 'react'
import Socials from '../../UI/Socials'
import { information } from '../../util/data'
import { Link } from 'react-router-dom'
import { formatDate } from '../../util/dateUtils'

const Homepage = () => {
  return (
    <div className='py-6 flex flex-col gap-6'>
    <section className='flex flex-col gap-6'>
        <h1 className='H2 inline-block underline decoration-[8px] decoration-Blue500 dark:text-Neutral0'>Hi, I'm Paulina👋</h1>
        <p className='H7 text-Neutral600 dark:text-Neutral400'>I’m on a journey to become a front-end web developer. I love building little projects, trying out new coding techniques, and sharing what I learn along the way. When I’m not at my desk, you’ll find me reading, hiking through the mountains, or challenging myself on rock-climbing walls. </p>
        <p className='H7 text-Neutral600 dark:text-Neutral400'>I started this blog to document my progress, keep myself accountable, and hopefully inspire anyone else who’s learning to code. Welcome to my corner of the internet, and thanks for stopping by!</p>
        <Socials padding={true}/>
    </section>
    <hr />
    <article className='flex flex-col gap-6'>
        <h2 className='H2 dark:text-Neutral0'>Latest Articles</h2>
        {information.slice(0, 5).map((article, index) => (
            <div key={index} className='flex flex-col gap-2'>
                <Link to={`/blog/${article.slug}`} className='flex flex-col gap-2'>
                  <h3 className='H5 text-Neutral700 dark:text-Neutral0'>{article.title}</h3>
                  <p className='H8italic text-Neutral600 dark:text-Neutral400'>{formatDate(article.publishedAt)}</p>
                </Link>
            </div>
        ))}
        <Link to="/blog" className='H6 text-Neutral700 dark:text-Neutral0 underline decoration-[4px] decoration-Blue500'>View all articles</Link>
    </article>
  </div>
  )
}

export default Homepage