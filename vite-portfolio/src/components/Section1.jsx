import React from 'react'

const Section1 = ({padding}) => {
  return (
    <section className={`${padding}  pt-[20px] md:pt-[90px] 1440:pt-[84px] bg-Slate100`}>
        <div className='grid'>
            <span className='Small text-Slate500'>HELLO, MY FRIEND. MY NAME IS</span>
            <h1 className='HeadingL  text-Slate600 max-w-[20ch]'>
                Dong Hee Lee, <br /> An <span className='border-b-8 border-Slate200 text-Slate500'>Aspiring</span> Web Developer
            </h1>
        </div>

        <div className='pt-[3rem] text-Slate500 text-[5px] w-[calc(116/375*100vw)] md:w-[calc(230/768*100vw)] h-[calc(259/375*100vw)] md:h-[calc(510/768*100vw)] 1440:h-[calc(766/1440*100vw)] bg-[#487EB0]/[19%] absolute right-[clamp(1rem,-1.684859154929577rem+11.455399061032862vw,8.625rem)] top-0'>
            <p>JUSTIFY-BETWEEN</p>
            <p>BRIGHTNESS-150</p>
            <p>ABSOLUTE</p>
            <p>ELEMENT.STYLE.DISPLAY = "NONE"</p>
            <p>BACKGROUND-COLOR: #FFFFFF</p>
            <p>FLEX FLEX-COL</p>
            <p>TRACKING-[-2PX]</p>
            <p>TEXT-SLATE-800</p>
            <p>UNDERLINE</p>
            <p>FLEX</p>
        </div>

        <hr className='mt-[106px] md:mt-[252px] border-0 border-b-4 border-Slate300'/>
        
    </section>
  )
}

export default Section1