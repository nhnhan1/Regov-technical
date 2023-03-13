import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { Logo } from 'src/assets/images'
import path from 'src/constants/path'

interface Props {
  className?: string
  collapsed: boolean
}

export default function SidebarHeader({ className, collapsed }: Props) {
  const navigate = useNavigate()
  const onNagivate = () => {
    navigate({
      pathname: path.dashboard
    })
  }
  return (
    <div
      className={classNames('flex px-8 py-4', className, {
        'opacity-0': collapsed
      })}
    >
      <img
        src={Logo}
        alt='logo'
        className='cursor-pointer'
        onClick={onNagivate}
        aria-hidden='true'
      />
    </div>
  )
}
