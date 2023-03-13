import isUndefined from 'lodash/isUndefined'
import omitBy from 'lodash/omitBy'
import { QueryConfig } from 'src/types/cases.type'
// eslint-disable-next-line import/no-unresolved
import useQueryParams from './useQueryParams'

export default function useQueryConfig() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || 10,
      name: queryParams.name,
      code: queryParams.code
    },
    isUndefined
  )
  return queryConfig
}
