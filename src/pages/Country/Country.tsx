import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import countriesApi from 'src/apis/countries.api'
import globalStatisticsApi from 'src/apis/globalStatistics'
import DataTable from 'src/components/DataTable'
import Dropdown from 'src/components/Dropdown'
import path from 'src/constants/path'
import { UNKNOWN } from 'src/constants/utils'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { CountryCase } from 'src/types/cases.type'
import { Columns } from 'src/types/table.type'
import { DropDownOptions } from 'src/types/utils.type'
import { formatDateTimeLocalExtended } from 'src/utils/utils'

const columns: Columns[] = [
  { field: 'Confirmed', headerName: 'Confirmed', sortable: true, width: 100 },
  {
    field: 'Recovered',
    headerName: 'Recovered',
    type: 'number',
    sortable: true,
    width: 100
  },
  {
    field: 'Deaths',
    headerName: 'Deaths',
    sortable: true,
    width: 100
  },

  {
    field: 'Date',
    headerName: 'Date',
    width: 150,
    valueGetter: (params: CountryCase) => {
      return formatDateTimeLocalExtended(params.Date) || UNKNOWN
    }
  }
]

export default function Country() {
  const navigate = useNavigate()
  const queryConfig = useQueryConfig()
  const [selected, setSelected] = useState<DropDownOptions | null>(null)

  const code = queryConfig?.code
  const name = queryConfig?.name
  const { data: casesInCountryData, isFetching } = useQuery({
    queryKey: ['case in country', code],
    queryFn: () => globalStatisticsApi.getByCountry(code as string),
    enabled: Boolean(code)
  })
  const { data: countriesData } = useQuery({
    queryKey: ['contries'],
    queryFn: () => countriesApi.getCountries(),
    staleTime: 3 * 60 * 1000
  })

  const casesInCountry = casesInCountryData?.data
  const countriesOptions =
    countriesData?.data.map((item) => ({
      id: item.ISO2,
      name: item.Country
    })) || []

  const onChange = (value: DropDownOptions) => {
    setSelected(value)
    navigate({
      pathname: path.country,
      search: createSearchParams({
        ...queryConfig,
        code: String(value.id),
        name: value.name
      }).toString()
    })
  }
  useEffect(() => {
    setSelected({
      id: code || '',
      name: name || ''
    })
  }, [code, name])

  return (
    <div>
      <div className='my-4 flex flex-col items-center justify-between md:flex-row'>
        <p className='text-xl font-bold'>Country Statistics</p>
        <Dropdown
          options={countriesOptions}
          onChange={onChange}
          value={selected}
        />
      </div>
      <DataTable
        data={casesInCountry || []}
        loading={isFetching}
        columns={columns}
        queryConfig={queryConfig}
      />
    </div>
  )
}
