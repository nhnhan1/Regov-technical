import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'
import { createSearchParams, Link, useLocation } from 'react-router-dom'
import { QueryConfig } from 'src/types/cases.type'
interface Props {
  queryConfig: QueryConfig
  pageSize: number
}
const RANGE = 1
export default function Pagination({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page)
  const location = useLocation()
  const pathname = location.pathname || '/'
  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span
            key={index}
            className='mx-2 flex items-center justify-center rounded-full border bg-white px-4 py-2 shadow-sm'
          >
            ...
          </span>
        )
      }
      return null
    }
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span
            key={index}
            className='mx-2 flex items-center justify-center rounded-full border bg-white px-4 py-2 shadow-sm'
          >
            ...
          </span>
        )
      }
      return null
    }
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (
          page <= RANGE * 2 + 1 &&
          pageNumber > page + RANGE &&
          pageNumber < pageSize - RANGE + 1
        ) {
          return renderDotAfter(index)
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (
            pageNumber > page + RANGE &&
            pageNumber < pageSize - RANGE + 1
          ) {
            return renderDotAfter(index)
          }
        } else if (
          page >= pageSize - RANGE * 2 &&
          pageNumber > RANGE &&
          pageNumber < page - RANGE
        ) {
          return renderDotBefore(index)
        }

        return (
          <Link
            to={{
              pathname: pathname,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            key={index}
            className={classNames(
              'mx-2 flex cursor-pointer items-center justify-center rounded-full border bg-white px-4 py-2 text-[13px] shadow-sm',
              {
                'border-secondary': pageNumber === page,
                'border-transparent': pageNumber !== page
              }
            )}
          >
            {pageNumber}
          </Link>
        )
      })
  }
  return (
    <div className='mt-6 flex flex-wrap justify-end'>
      {page === 1 ? (
        <span className='mx-2 flex cursor-not-allowed items-center justify-center rounded-full border bg-white/60 px-3 py-2  shadow-sm'>
          <ChevronLeftIcon className='h-4 w-4' />
        </span>
      ) : (
        <Link
          to={{
            pathname: pathname,
            search: createSearchParams({
              ...queryConfig,
              page: (page - 1).toString()
            }).toString()
          }}
          className='mx-2 flex cursor-pointer items-center justify-center rounded-full border bg-white px-3 py-2 shadow-sm'
        >
          <ChevronLeftIcon className='h-4 w-4' />
        </Link>
      )}

      {renderPagination()}
      {page === pageSize ? (
        <span className='mx-2 flex cursor-not-allowed items-center justify-center rounded-full border bg-white/60 px-3 py-2  shadow-sm'>
          <ChevronRightIcon className='h-4 w-4' />
        </span>
      ) : (
        <Link
          to={{
            pathname: pathname,
            search: createSearchParams({
              ...queryConfig,
              page: (page + 1).toString()
            }).toString()
          }}
          className='mx-2 flex cursor-pointer items-center justify-center rounded-full  border bg-white px-3 py-2  shadow-sm'
        >
          <ChevronRightIcon className='h-4 w-4' />
        </Link>
      )}
    </div>
  )
}
