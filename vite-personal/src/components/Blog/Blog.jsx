import React from 'react'
import { information } from '../../util/data'
import { Link } from 'react-router-dom'
import SingleBlog from './SingleBlog'

const Blog = () => {
  return (
    <section>
      <div>
          <h1>My Articles</h1>
          <p>Below are all my recent blog posts. CLick on any title to read the full article.</p>
      </div>
      <article className='flex flex-col gap-4'>
        {information.map((article, index) => (
            <>
              <hr />
              <div key={index}>
                <Link to={`/blog/${article.slug}`} className='flex flex-col gap-2'>
                  <h3>{article.title}</h3>
                  <p>{article.publishedAt}</p>
                  <p>{article.description}</p>
                </Link>
              </div>
            </>
        ))}
      </article>
    </section>
  )
}

export default Blog