import moment from 'moment'
const DATE_TIME_FORMAT = 'YYYY-MMM-DD, hh:mm:ss A'

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
}

export const formatDateTimeLocalExtended = (timeStamp: string) => {
  if (!timeStamp) return
  return moment(timeStamp).local().format(DATE_TIME_FORMAT)
}
