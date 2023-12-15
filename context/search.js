'use client'
import { useRouter } from 'next/navigation'
import { useState, useContext, createContext} from 'react'

export const SearchContext = createContext()

export const SearchProvider = ({children}) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const router = useRouter()

    const fetchSearchResults = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API}/search?searchQuery=${searchQuery}`)
            if (!response.ok){
                throw new Error('Failed to fetch search')
            }
            const data = await response.json()
            router.push(`/search?searchQuery=${searchQuery}`)
            setSearchResults(data)
        } catch (error) {
            
        }
    }

    return (
        <SearchContext.Provider value={{searchQuery, searchResults, setSearchQuery, setSearchResults, fetchSearchResults}}>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearch = () => useContext(SearchContext)