import {
  BuildingStorefrontIcon,
  GlobeAsiaAustraliaIcon
} from '@heroicons/react/24/solid'
import classNames from 'classnames'
import React from 'react'
import {
  Menu,
  MenuItem,
  // eslint-disable-next-line import/named
  MenuItemStyles,
  Sidebar,
  useProSidebar
} from 'react-pro-sidebar'
import { useLocation, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import SidebarHeader from './SidebarHeader'

type Theme = 'light' | 'dark'

const themes = {
  light: {
    sidebar: {
      backgroundColor: '#ffffff',
      color: '#607489'
    },
    menu: {
      menuContent: '#fbfcfd',
      icon: '#0098e5',
      hover: {
        backgroundColor: '#c5e4ff',
        color: '#44596e'
      },
      disabled: {
        color: '#9fb6cf'
      }
    }
  },
  dark: {
    sidebar: {
      backgroundColor: '#0b2948',
      color: '#8ba1b7'
    },
    menu: {
      menuContent: '#082440',
      icon: '#59d0ff',
      hover: {
        backgroundColor: '#00458b',
        color: '#b6c8d9'
      },
      disabled: {
        color: '#3e5e7e'
      }
    }
  }
}

const MENU_LIST = [
  {
    icon: <GlobeAsiaAustraliaIcon className='h-7 w-7' />,
    title: 'Dashboard',
    to: path.dashboard
  },
  {
    icon: <BuildingStorefrontIcon className='h-7 w-7' />,
    title: 'Country',
    to: path.country
  }
]
const SidebarMenu = () => {
  const location = useLocation()
  const pathname = location.pathname || '/'
  const nagivate = useNavigate()
  const { collapsed } = useProSidebar()
  const [isRTL, setIsRTL] = React.useState<boolean>(false)
  const [theme, setTheme] = React.useState<Theme>('light')
  const menuItemStyles: MenuItemStyles = {
    root: {
      fontSize: '14px',
      fontWeight: 500
    },
    button: {
      '&:hover': {
        backgroundColor: 'transparent'
      }
    }
  }
  return (
    <>
      <Sidebar
        rtl={isRTL}
        breakPoint='lg'
        backgroundColor='white'
        rootStyles={{
          color: themes[theme].sidebar.color
        }}
      >
        <div className='flex h-full flex-col px-3'>
          <SidebarHeader
            className='mb-[24px] mt-[16px] '
            collapsed={collapsed}
          />
          <div style={{ flex: 1, marginBottom: '32px' }}>
            <Menu menuItemStyles={menuItemStyles}>
              {MENU_LIST.map((menu) => (
                <MenuItem
                  icon={menu.icon}
                  key={menu.title}
                  active={pathname === menu.to}
                  className={classNames(
                    'delay-50 my-1 rounded-lg transition ease-in hover:rounded-lg hover:bg-secondary hover:bg-opacity-20 hover:text-secondary',
                    {
                      'bg-secondary bg-opacity-20 text-secondary':
                        pathname === menu.to,
                      'text-primary': pathname !== menu.to
                    }
                  )}
                  onClick={() =>
                    nagivate({
                      pathname: menu.to
                    })
                  }
                >
                  {menu.title}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>
      </Sidebar>
    </>
  )
}
export default SidebarMenu
