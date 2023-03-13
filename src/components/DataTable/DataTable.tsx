import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'
import { useCallback, useState } from 'react'
import { QueryConfig } from 'src/types/cases.type'
import { Columns } from 'src/types/table.type'
import Loading from '../Loading'
import Pagination from '../Pagination'

interface Props {
  data: data[]
  columns: Columns[]
  queryConfig: QueryConfig
  loading?: boolean
}
type data = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
type SortKeys = keyof data | null
type SortOrder = 'ascn' | 'desc' | null

const sortData = ({
  tableData,
  sortKey,
  reverse,
  queryConfig
}: {
  tableData: data[]
  sortKey: SortKeys
  reverse: boolean
  queryConfig: QueryConfig
}) => {
  const page = Number(queryConfig.page)
  const limit = Number(queryConfig.limit)
  const tableDataExtend = tableData.slice((page - 1) * limit, limit * page)
  if (!sortKey) return tableDataExtend
  const sortedData = tableDataExtend.sort((a, b) => {
    return a[sortKey] > b[sortKey] ? -1 : 1
  })
  if (reverse) {
    return sortedData.reverse()
  }
  return sortedData
}
const SortButton = ({
  sortOrder,
  columnKey,
  sortKey
}: {
  sortOrder: SortOrder
  columnKey: SortKeys
  sortKey: SortKeys
}) => {
  return (
    <button>
      {sortKey === columnKey && sortOrder === 'desc' ? (
        <ArrowUpIcon className='h-4 w-4 opacity-0 group-hover:opacity-100' />
      ) : (
        <ArrowDownIcon className='h-4 w-4 opacity-0 group-hover:opacity-100' />
      )}
    </button>
  )
}

export default function DataTable({
  columns,
  data,
  queryConfig,
  loading
}: Props) {
  const [sortKey, setSortKey] = useState<SortKeys>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>(null)
  const limit = Number(queryConfig.limit)

  const sortedData = useCallback(
    () =>
      sortData({
        tableData: data,
        sortKey,
        reverse: sortOrder === 'desc',
        queryConfig
      }),
    [data, sortKey, sortOrder, queryConfig]
  )
  const changeSort = (key: SortKeys) => {
    setSortOrder((prev) => (prev === 'ascn' ? 'desc' : 'ascn'))
    setSortKey(key)
  }
  const pageSizePagination = Math.ceil(data.length / limit) || 1
  return (
    <div className='rounded-xl border border-gray-200 pb-4'>
      <div className='w-full overflow-x-auto rounded-xl'>
        <table className='table-users'>
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.field}
                  className={classNames('group', {
                    'cursor-pointer': column?.sortable
                  })}
                  style={{
                    width: `${column.width}px`
                  }}
                  onClick={() => changeSort(column.field)}
                >
                  <p className='delay-250 flex items-center justify-between transition ease-in-out '>
                    {column.headerName}
                    {column?.sortable && (
                      <SortButton
                        columnKey={column.field}
                        {...{
                          sortOrder,
                          sortKey
                        }}
                      />
                    )}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!loading &&
              sortedData().length > 0 &&
              sortedData().map((row, idx) => {
                return (
                  <tr key={idx}>
                    {columns.map((column: Columns) => {
                      if (Object.keys(row).includes(column.field)) {
                        return (
                          <td
                            key={column.field}
                            style={{ maxWidth: `${column.width}px` }}
                            className='truncate'
                          >
                            {column.valueGetter ? (
                              column.valueGetter(row)
                            ) : (
                              <p className='truncate'>
                                {row[column.field as keyof typeof row]}
                              </p>
                            )}
                          </td>
                        )
                      } else {
                        // eslint-disable-next-line react/jsx-key
                        return <td key={column.field}> </td>
                      }
                    })}
                  </tr>
                )
              })}
          </tbody>
        </table>
        {loading && (
          <div className='flex h-[530px] items-center justify-center'>
            <Loading />
          </div>
        )}
        {!loading && sortedData().length === 0 && (
          <div className='flex h-[530px] items-center justify-center'>
            <p className='text-md'>There are no data</p>
          </div>
        )}
      </div>
      <div className='mr-2'>
        <Pagination pageSize={pageSizePagination} queryConfig={queryConfig} />
      </div>
    </div>
  )
}
