import React from 'react'
import { parseMarkdown } from '../../util/markdownEditor'
import { useParams } from 'react-router-dom'
import { information } from '../../util/data'


const SingleBlog = () => {
  const { slug } = useParams()
  const blog = information.find(article => article.slug === slug)

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {blog ? (
        <>
          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
          <p className="text-gray-600 mb-8">{new Date(blog.publishedAt).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
          <div className="prose max-w-none">
            {parseMarkdown(blog.content)}
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default SingleBlog