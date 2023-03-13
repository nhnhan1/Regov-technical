interface Props {
  title: string
  content: string
  classNameIcon?: string
  IconCard?: React.ReactNode
}

export default function Card({ title, content, IconCard }: Props) {
  return (
    <div className='rounded-lg border border-gray-200 px-6 py-7 shadow-md'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='mb-3 text-sm'>{title}</h2>
          <p className='text-2xl font-bold'>{content}</p>
        </div>
        {IconCard}
      </div>
    </div>
  )
}
