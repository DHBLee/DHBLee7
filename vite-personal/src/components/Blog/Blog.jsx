import React from 'react'
import { information } from '../../util/data'
import { Link } from 'react-router-dom'
import SingleBlog from './SingleBlog'
import { formatDate } from '../../util/dateUtils'

const Blog = () => {
  return (
    <section className='flex flex-col gap-6 py-6'>
      <div>
          <h1 className='H2 dark:text-Neutral0'>My Articles</h1>
          <p className='H7 text-Neutral600 dark:text-Neutral400'>Below are all my recent blog posts. Click on any title to read the full article.</p>
      </div>
      <article className='flex flex-col gap-4'>
        {information.map((article, index) => (
            <>
              <hr />
              <div key={index}>
                <Link to={`/blog/${article.slug}`} className='flex flex-col gap-2'>
                  <h3 className="H5 text-Neutral700 dark:text-Neutral0">{article.title}</h3>
                  <p className="H8italic text-Neutral600 dark:text-Neutral400">{formatDate(article.publishedAt)}</p>
                  <p className="H7 text-Neutral600 dark:text-Neutral400">{article.description}</p>
                </Link>
              </div>
            </>
        ))}
      </article>
    </section>
  )
}

export default Blog