import React, { useState } from 'react'
import Project from './UI/Project'
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../util/projects'
import AnimatedSection from './UI/AnimatedSection';

const Section4 = ({padding}) => {
  const [visibleProjects, setVisibleProjects] = useState(4);
  const [isLoading, setIsLoading] = useState(false);
  const [newlyLoaded, setNewlyLoaded] = useState([]);

  const loadMore = () => {
    setIsLoading(true);
    const currentLenght = visibleProjects;
    const nextLength = Math.min(currentLenght + 4, projects.length)

    setNewlyLoaded(projects.slice(currentLenght, nextLength).map(p => p.name))
    setTimeout(() => {
      setVisibleProjects(nextLength);
      setIsLoading(false);

      setTimeout(() => setNewlyLoaded([]), 1000)
    }, 500)
  };
  const seeLess = () => {
    setVisibleProjects(4)
  };


  return (
    <section id="project" className={`${padding}  bg-Slate600 py-[24px] md:py-[47px] 1440:py-[60px]`}>
        <AnimatedSection>
            <div className='grid gap-6 md:gap-12 1440:gap-[83px] mx-auto max-w-[1320px]'>
              <div className='flex items-center gap-4'>
                <h2 className='HeadingM text-Slate500'>MY PROJECTS</h2>
                <p className='text-Slate500 Small flex gap-3'>
                  ( featuring 
                  <a href="https://www.frontendmentor.io/" target='_blank' className='hover:underline'>Frontend Mentor</a>
                  )
                </p>
              </div>
              <div className='grid gap-[38px] md:gap-[72px] 1440:gap-[111px]'>
                {projects.slice(0, visibleProjects).map((project, index) => (
                  <Project 
                    key={index}
                    img={project.img}
                    name={project.name}
                    description={project.description}
                    link={project.link}
                    codelink={project.codelink}
                    techstack={project.techstack}
                    reverse={index % 2 === 0}
                    loading="lazy"
                    customAnimation={newlyLoaded.includes(project.name) ? { initial: {opacity: 0, y: 50}, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: index * 0.1 } } : null}
                  />
                ))}
              </div>

              {visibleProjects < projects.length ? (
                <button
                  onClick={loadMore}
                  className='w-max mx-auto border-b-3 text-Slate500 transition-colors hover:text-Slate200 Small'  
                >
                  {isLoading ? (
                    <span>
                      LOADING...
                    </span>
                  ) : (
                    'LOAD MORE'
                  )}
                </button>
              ) : (
                <>
                <button
                  onClick={seeLess}
                  className='w-max mx-auto border-b-3 text-Slate500 transition-colors hover:text-Slate200 Small'
                >
                  SEE LESS
                </button>
                <p className='mx-auto text-Slate500 Small'>See more of my projects at <a href="https://www.frontendmentor.io/profile/DHBLee" target='_blank' className='hover:underline'>https://www.frontendmentor.io/profile/DHBLee</a></p>
                </>
              )}
            </div>
        </AnimatedSection>
    </section>
  )
}

export default Section4