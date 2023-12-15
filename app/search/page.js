'use client'



import React, { useEffect } from 'react'
import { useSearch } from "../../context/search"
import { useSearchParams } from 'next/navigation'
import BlogList from '../../components/blogs/BlogList'

function Search() {
  const {setSearchQuery, searchResults, setSearchResults} = useSearch()
  const searchParams = useSearchParams()
  const query = searchParams.get('searchQuery')

    useEffect(() => {


      
    }, [query])

    const fetchResultsOnLoad = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/search? `)
      } catch (error) {
        
      }
    }
    
  return (
    <div>
      <BlogList/>
    </div>
  )
}

export default Search