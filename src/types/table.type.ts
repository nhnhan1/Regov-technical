import React from 'react'

export interface Columns {
  field: string
  headerName: string
  type?: string
  width: number | string
  sortable?: boolean
  valueGetter?: (params: any) => React.ReactNode | string
}
