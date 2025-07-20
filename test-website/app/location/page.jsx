import React from 'react'

export const metadata = {
    title: "Location",
    description: "Learn more about the location of Mezzalira and its nearby parking",
    alternates: {
    canonical: "https://mezzalira.com.au/location",
  },
  openGraph: {
    title: "Location – Mezzalira Ristorante",
    description: "Learn more about the location of Mezzalira and its nearby parking",
    images: [
      {
        url: "/mezzalira-location.png",
        width: 1200,
        height: 630,
        alt: "Outside photo of Mezzalira Ristorante",
      },
    ],
  },
}

const parkingLinks = [
  {
   name: 'Secure Parking Marcus Clarke, Canberra Car Park',
   link: 'https://www.google.com/maps/place/Secure+Parking+-+Marcus+Clarke,+Canberra+Car+Park/@-35.277613,149.1165948,16z/data=!4m7!3m6!1s0x6b164d42bb015acd:0x5ec16dcb111ff769!8m2!3d-35.2776135!4d149.1256075!15sChZwYXJraW5nIG5lYXIgTWV6emFsaXJhkgEOcGFya2luZ19nYXJhZ2WqAVkKCy9nLzF0bDltcjJ3EAEqCyIHcGFya2luZygAMh8QASIb86zYjo3cj4xrIDRwam8wOlrAaFPOlvL-EJBEMhoQAiIWcGFya2luZyBuZWFyIG1lenphbGlyYeABAA!16s%2Fg%2F1tt0r8pp?authuser=0&entry=ttu&g_ep=EgoyMDI1MDYyMi4wIKXMDSoASAFQAw%3D%3D',
  },
  {
   name: 'Secure Parking - City West Canberra Car Park',
   link: 'https://www.google.com/maps/place/Secure+Parking+-+Marcus+Clarke,+Canberra+Car+Park/@-35.277613,149.1165948,16z/data=!4m7!3m6!1s0x6b164d42bb015acd:0x5ec16dcb111ff769!8m2!3d-35.2776135!4d149.1256075!15sChZwYXJraW5nIG5lYXIgTWV6emFsaXJhkgEOcGFya2luZ19nYXJhZ2WqAVkKCy9nLzF0bDltcjJ3EAEqCyIHcGFya2luZygAMh8QASIb86zYjo3cj4xrIDRwam8wOlrAaFPOlvL-EJBEMhoQAiIWcGFya2luZyBuZWFyIG1lenphbGlyYeABAA!16s%2Fg%2F1tt0r8pp?authuser=0&entry=ttu&g_ep=EgoyMDI1MDYyMi4wIKXMDSoASAFQAw%3D%3D',
  },
  {
   name: 'Wilson Parking - PCYC Turney Car Park',
   link: 'https://www.google.com/maps/place/Secure+Parking+-+Marcus+Clarke,+Canberra+Car+Park/@-35.277613,149.1165948,16z/data=!4m7!3m6!1s0x6b164d42bb015acd:0x5ec16dcb111ff769!8m2!3d-35.2776135!4d149.1256075!15sChZwYXJraW5nIG5lYXIgTWV6emFsaXJhkgEOcGFya2luZ19nYXJhZ2WqAVkKCy9nLzF0bDltcjJ3EAEqCyIHcGFya2luZygAMh8QASIb86zYjo3cj4xrIDRwam8wOlrAaFPOlvL-EJBEMhoQAiIWcGFya2luZyBuZWFyIG1lenphbGlyYeABAA!16s%2Fg%2F1tt0r8pp?authuser=0&entry=ttu&g_ep=EgoyMDI1MDYyMi4wIKXMDSoASAFQAw%3D%3D',
  },
  {
   name: 'Barry Drive Car Park',
   link: 'https://www.google.com/maps/place/Barry+Drive+Car+Park/@-35.2750357,149.1183744,16z/data=!4m7!3m6!1s0x6b164d6781bce629:0x9696ac5a2a6635b5!8m2!3d-35.2750355!4d149.127387!15sChZwYXJraW5nIG5lYXIgTWV6emFsaXJhkgELcGFya2luZ19sb3SqAVkKCy9nLzF0bDltcjJ3EAEqCyIHcGFya2luZygAMh8QASIb86zYjo3cj4xrIDRwam8wOlrAaFPOlvL-EJBEMhoQAiIWcGFya2luZyBuZWFyIG1lenphbGlyYeABAA!16s%2Fg%2F11f15_c_7h?authuser=0&entry=ttu&g_ep=EgoyMDI1MDYyMi4wIKXMDSoASAFQAw%3D%3D',
  },
  {
   name: 'Secure Parking - 17 Moore Street, Canberra Car Park',
   link: 'https://www.google.com/maps/place/Barry+Drive+Car+Park/@-35.2750357,149.1183744,16z/data=!4m7!3m6!1s0x6b164d6781bce629:0x9696ac5a2a6635b5!8m2!3d-35.2750355!4d149.127387!15sChZwYXJraW5nIG5lYXIgTWV6emFsaXJhkgELcGFya2luZ19sb3SqAVkKCy9nLzF0bDltcjJ3EAEqCyIHcGFya2luZygAMh8QASIb86zYjo3cj4xrIDRwam8wOlrAaFPOlvL-EJBEMhoQAiIWcGFya2luZyBuZWFyIG1lenphbGlyYeABAA!16s%2Fg%2F11f15_c_7h?authuser=0&entry=ttu&g_ep=EgoyMDI1MDYyMi4wIKXMDSoASAFQAw%3D%3D',
  },
  {
   name: '3 Knowles Pl Parking',
   link: 'https://www.google.com/maps/place/Barry+Drive+Car+Park/@-35.2750357,149.1183744,16z/data=!4m7!3m6!1s0x6b164d6781bce629:0x9696ac5a2a6635b5!8m2!3d-35.2750355!4d149.127387!15sChZwYXJraW5nIG5lYXIgTWV6emFsaXJhkgELcGFya2luZ19sb3SqAVkKCy9nLzF0bDltcjJ3EAEqCyIHcGFya2luZygAMh8QASIb86zYjo3cj4xrIDRwam8wOlrAaFPOlvL-EJBEMhoQAiIWcGFya2luZyBuZWFyIG1lenphbGlyYeABAA!16s%2Fg%2F11f15_c_7h?authuser=0&entry=ttu&g_ep=EgoyMDI1MDYyMi4wIKXMDSoASAFQAw%3D%3D',
  },
]

const location = () => {
  return (
    <section className='bg-black py-[5rem] px-[24px] md:px-[32px] 1440:px-[86px] flex flex-col items-center gap-10'>
      <h1 className='HeadingM'>LOCATION</h1>
      <div className='flex items-center gap-10 Body'>
        <a href="https://www.google.com/maps/place/Mezzalira+Italian+Restaurant/@-35.2793577,149.127825,3a,75y,27.99h,90t/data=!3m7!1e1!3m5!1saZatREMOU-wabqBkhiHyXg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0%26panoid%3DaZatREMOU-wabqBkhiHyXg%26yaw%3D27.990719!7i16384!8i8192!4m14!1m7!3m6!1s0x6b164d68247db179:0xe7b74f4cdd4d0c3c!2sMezzalira+Italian+Restaurant!8m2!3d-35.2792545!4d149.1279026!16s%2Fg%2F1tl9mr2w!3m5!1s0x6b164d68247db179:0xe7b74f4cdd4d0c3c!8m2!3d-35.2792545!4d149.1279026!16s%2Fg%2F1tl9mr2w?entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D" target="_blank">
          <img className="w-[300px]" src="/mezzalira-location.png" alt="A screenshot of Mezzalira's Location in Google" />
        </a>
        <a href="https://www.google.com/maps/search/parking+nearby+Mezzalira/@-35.2793489,149.127825,17z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D" target='_blank'>
          <img className="w-[300px]" src="/parking.png" alt="A screenshot of Nearby Parking in Mezzalira" />
        </a>
      </div>
      <ul className='flex flex-col items-center gap-10'>
        <h2 className='text-center text-[24px] md:text-[28px] 1440:text-[32px]'>Check the List of Nearby Parkings</h2>
        {parkingLinks.map((link, idx) => (
          <li key={idx} className='underline Body'>
            <a href={link.link} target="_blank" rel="noopener noreferrer">{link.name}</a>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default location