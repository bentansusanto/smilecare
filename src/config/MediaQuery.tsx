import { useEffect, useState } from "react"

export const MediaQuery = (query: string) => {
    const [mathes, setMatches] = useState<boolean>(false)
    
    useEffect(() => {
        const mediaQuery = window.matchMedia(query)
        setMatches(mediaQuery.matches)

        const handler = (e:MediaQueryListEvent) => {
            setMatches(e.matches)
        }

        mediaQuery.addEventListener('change', handler)

        return () => {
            mediaQuery.removeEventListener('change', handler)
        }
    }, [query])
    return mathes;
}

export const Mobile = () => {
    const isMobile = MediaQuery('(max-width: 767px)')
    return isMobile;
}