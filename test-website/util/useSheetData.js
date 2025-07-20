'use client'

import { useEffect, useState } from 'react'
import { fetchSheetData } from '@/util/fetchSheetData'

export function useSheetData(url, defaultValue = []) {
  const [data, setData] = useState(defaultValue)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    setLoading(true)

    fetchSheetData(url)
      .then(fetched => {
        if (!mounted) return

        // Filter out rows with any missing or empty fields
        const filtered = fetched.filter(row => 
          Object.values(row).every(value => value !== null && value !== undefined && String(value).trim() !== '')
        );

        setData(filtered)
      })
      .finally(() => setLoading(false))

    return () => { mounted = false }
  }, [url])

  return [data, loading]
}
