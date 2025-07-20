'use client'

import Button from '@/UI/Button';
import { useSheetData } from '@/util/useSheetData';
import React from 'react'

const PDFlists = () => {
    const [pdfs, loadingPdfs] = useSheetData('pdfs');


    if (loadingPdfs) return <p>Loading PDFs...</p>
    
    return (
    <section className=''>
        <ul className='flex flex-wrap gap-10 justify-center'>
            {pdfs.map((pdf, idx) => (
                <li key={idx}>
                    <Button>
                        <a href={pdf.link} target='_blank'>{pdf.name} menu.pdf</a>
                    </Button>
                </li>
            ))}
        </ul>
    </section>
  )
}

export default PDFlists