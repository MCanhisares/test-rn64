import { User } from '../types/user'
import { createContainer } from 'unstated-next'
import { useEffect, useState } from 'react'
import { concatenateUserString } from '../logic'
import loadLocalResource from 'react-native-local-resource'

import rawTxt from '../data/data.txt'

const useSearch = () => {
  const [rawData, setRawData] = useState<User[]>([])
  const [data, setData] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadLocalResource(rawTxt).then(content => {
      const jsonData = JSON.parse(content)

      const rawUsers = jsonData.data as Pick<
        User,
        'address' | 'avatar' | 'city' | 'email' | 'name' | 'title'
      >[]
      const users = rawUsers.map(user => ({
        ...user,
        fullString: concatenateUserString(user),
      }))
      setRawData(users)
      setData(users)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (searchQuery === undefined || !rawData.length) {
      return
    }
    if (searchQuery.length === 0) {
      setData(rawData)
      return
    }
    const validUsers = rawData.filter(u => {
      return u.fullString.includes(searchQuery)
    })

    return setData(validUsers)
  }, [searchQuery, rawData])

  const find = (query: string) => {
    setSearchQuery(query.toLowerCase())
  }

  return {
    data,
    find,
    searchQuery,
    loading,
  }
}

export const SearchContext = createContainer(useSearch)
