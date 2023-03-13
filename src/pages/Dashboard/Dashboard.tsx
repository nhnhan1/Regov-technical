import {
  ArchiveBoxXMarkIcon,
  ArrowTrendingUpIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/solid'
import { useQuery } from '@tanstack/react-query'
import { includes } from 'lodash'
import { useMemo, useState } from 'react'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import globalStatisticsApi from 'src/apis/globalStatistics'
import Card from 'src/components/Card'
import DataTable from 'src/components/DataTable'
import path from 'src/constants/path'
import { UNKNOWN } from 'src/constants/utils'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { Countries } from 'src/types/cases.type'
import { Columns } from 'src/types/table.type'
import {
  formatDateTimeLocalExtended,
  formatNumberToSocialStyle
} from 'src/utils/utils'
import BarChartStatistics from './BarChartStatistics'

const columns: Columns[] = [
  {
    field: 'Country',
    headerName: 'Country',
    sortable: true,
    width: 150,
    valueGetter: (params: Countries) => {
      return (
        <Link
          to={{
            pathname: path.country,
            search: createSearchParams({
              code: params.CountryCode,
              name: params.Country
            }).toString()
          }}
          className='text-blue-500'
        >
          {params.Country}
        </Link>
      )
    }
  },
  {
    field: 'NewConfirmed',
    headerName: 'New Confirmed',
    sortable: true,
    width: 50
  },
  {
    field: 'TotalConfirmed',
    headerName: 'Total Confirmed',
    sortable: true,
    width: 50
  },
  {
    field: 'NewDeaths',
    headerName: 'New Deaths',
    sortable: true,
    width: 50
  },
  {
    field: 'TotalDeaths',
    headerName: 'Total Deaths',
    sortable: true,
    width: 50
  },
  {
    field: 'NewRecovered',
    headerName: 'New Recovered',
    sortable: true,
    width: 50
  },
  {
    field: 'TotalRecovered',
    headerName: 'Total Recovered',
    sortable: true,
    width: 50
  },
  {
    field: 'Date',
    headerName: 'Date',
    sortable: false,
    width: 150,
    valueGetter: (params: Countries) => {
      return formatDateTimeLocalExtended(params.Date) || UNKNOWN
    }
  }
]

export default function Dashboard() {
  const queryConfig = useQueryConfig()
  const nagivate = useNavigate()
  const [searchValue, setSearchValue] = useState('')
  const [countriesStatistics, setCountriesStatistics] = useState<Countries[]>(
    []
  )
  const page = Number(queryConfig.page)
  const limit = Number(queryConfig.limit)

  const { data: summaryCasesData, isFetching } = useQuery({
    queryKey: ['summary'],
    queryFn: () => globalStatisticsApi.getSummary(),
    onSuccess: ({ data }) => {
      setCountriesStatistics(data?.Countries || [])
    }
  })
  const onSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!searchValue) {
      setCountriesStatistics(summaryCasesData?.data.Countries || [])
    }
    if (!summaryCasesData?.data?.Countries) {
      setCountriesStatistics([])
    } else {
      const summaryCasesSearched =
        summaryCasesData?.data.Countries.filter((country) =>
          includes(country.Country.toLowerCase(), searchValue.toLowerCase())
        ) || []
      setCountriesStatistics(summaryCasesSearched)
    }
    nagivate({
      pathname: path.dashboard,
      search: createSearchParams({
        ...queryConfig,
        page: '1'
      }).toString()
    })
  }
  const summaryGobal = summaryCasesData?.data.Global

  const chartDataExtend = useMemo(() => {
    return countriesStatistics
      .slice((page - 1) * limit, limit * page)
      .map((data) => ({
        name: data.Country,
        NewConfirmed: data.NewConfirmed,
        NewDeaths: data.NewDeaths,
        NewRecovered: data.NewRecovered
      }))
  }, [page, limit, countriesStatistics])

  return (
    <div className=''>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        <Card
          title='New Case'
          content={`${formatNumberToSocialStyle(
            summaryGobal?.NewConfirmed || 0
          )} / ${formatNumberToSocialStyle(summaryGobal?.TotalConfirmed || 0)}`}
          classNameIcon='text-primary'
          IconCard={<CubeTransparentIcon className='h-10 w-10 text-red-400' />}
        />
        <Card
          title='New Recovered'
          content={`${formatNumberToSocialStyle(
            summaryGobal?.NewRecovered || 0
          )} / ${formatNumberToSocialStyle(summaryGobal?.TotalRecovered || 0)}`}
          IconCard={
            <ArrowTrendingUpIcon className='h-10 w-10 text-secondary' />
          }
        />
        <Card
          title='New Deaths'
          content={`${formatNumberToSocialStyle(
            summaryGobal?.NewDeaths || 0
          )} / ${formatNumberToSocialStyle(summaryGobal?.TotalDeaths || 0)}`}
          IconCard={<ArchiveBoxXMarkIcon className='h-10 w-10 text-third' />}
        />
      </div>
      <form
        onSubmit={onSubmitSearch}
        className='my-6 flex items-center justify-end'
      >
        <div className='flex items-center rounded-lg border hover:ring-1 focus:ring-1'>
          <input
            type='text'
            placeholder='Search country'
            name='contries'
            className='mr-2 w-[250px] rounded-md px-3 py-3 text-sm outline-none'
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button type='submit' className='mr-2'>
            <MagnifyingGlassIcon className='h-8 w-8 rounded-full bg-secondary bg-opacity-60 p-2 text-white hover:bg-opacity-90 focus:bg-opacity-90' />
          </button>
        </div>
      </form>
      <DataTable
        data={countriesStatistics || []}
        columns={columns}
        loading={isFetching}
        queryConfig={queryConfig}
      />
      {countriesStatistics.length > 0 && (
        <div className='mt-8 rounded-lg border px-2 py-8 pb-8'>
          <p className='mb-8 ml-6 text-xl font-bold'>
            Global Statistics Today (Page {page})
          </p>
          <BarChartStatistics data={chartDataExtend} />
        </div>
      )}
    </div>
  )
}
