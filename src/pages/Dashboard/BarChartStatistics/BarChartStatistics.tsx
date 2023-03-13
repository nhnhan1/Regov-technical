import { memo } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

type data = {
  name: string
  NewConfirmed: number
  NewDeaths: number
  NewRecovered: number
}
interface Props {
  data: data[]
}
const color = {
  NewConfirmed: '#f87171',
  NewRecovered: '#b0c634',
  NewDeaths: '#36699b'
}
const tickFormatter = (value: string) => {
  const limit = 10 // put your maximum character
  if (value.length < limit) return value
  return `${value.substring(0, limit)}...`
}
function BarChartStatistics({ data }: Props) {
  return (
    <ResponsiveContainer width='100%' height={500}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis
          dataKey='name'
          height={60}
          interval={0}
          tickFormatter={tickFormatter}
        />
        <YAxis />
        <Tooltip />
        <Bar dataKey='NewConfirmed' name='New Case' fill={color.NewConfirmed} />
        <Bar
          dataKey='NewRecovered'
          fill={color.NewRecovered}
          name='New Recovered'
        />
        <Legend />
        <Bar dataKey='NewDeaths' fill={color.NewDeaths} name='New Deaths' />
      </BarChart>
    </ResponsiveContainer>
  )
}
export default memo(BarChartStatistics)
