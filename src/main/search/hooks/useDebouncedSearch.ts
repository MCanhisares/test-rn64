import useConstant from 'use-constant'
import AwesomeDebouncePromise from 'awesome-debounce-promise'

export const useDebouncedSearch = (searchFunction: (text: string) => void) => {
  const debouncedSearchFunction = useConstant(() =>
    AwesomeDebouncePromise(searchFunction, 500)
  )

  return {
    debouncedSearchFunction,
  }
}
