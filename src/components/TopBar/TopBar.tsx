import { Disclosure, Menu, Transition } from '@headlessui/react'
import {
  AdjustmentsHorizontalIcon,
  ArrowLeftIcon,
  ArrowRightIcon
} from '@heroicons/react/24/solid'
import { Fragment } from 'react'
import { useProSidebar } from 'react-pro-sidebar'
import { Avatar } from 'src/assets/images'
import path from 'src/constants/path'
import { clearLS } from 'src/utils/auth'
const user = {
  name: 'Admin',
  email: 'Admin@gamil.com',
  imageUrl: Avatar
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function TopBar() {
  const { toggleSidebar, collapseSidebar, broken, collapsed } = useProSidebar()
  const logout = () => {
    clearLS()
    window.location.href = path.login
  }
  return (
    <>
      <div className='relative'>
        <Disclosure as='nav' className='border-b border-b-gray-200 bg-white'>
          {({ open }) => (
            <>
              <div className='mx-auto px-4 sm:px-6 lg:px-6'>
                <div className='flex h-14 items-center justify-between'>
                  <div className='flex items-center'>
                    {broken && (
                      <button
                        className='cursor-pointer rounded-md border border-gray-200 px-2 py-1'
                        onClick={() => toggleSidebar()}
                      >
                        <AdjustmentsHorizontalIcon className='h-5 w-5' />
                      </button>
                    )}
                  </div>
                  <div className=' md:block'>
                    <div className='ml-4 flex items-center md:ml-6'>
                      {/* Profile dropdown */}
                      <Menu as='div' className='relative ml-3'>
                        <div>
                          <Menu.Button className='flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                            <span className='sr-only'>Open user menu</span>
                            <img
                              className='h-8 w-8 rounded-full'
                              src={user.imageUrl}
                              alt=''
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter='transition ease-out duration-100'
                          enterFrom='transform opacity-0 scale-95'
                          enterTo='transform opacity-100 scale-100'
                          leave='transition ease-in duration-75'
                          leaveFrom='transform opacity-100 scale-100'
                          leaveTo='transform opacity-0 scale-95'
                        >
                          <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block w-full px-4 py-2 text-sm text-gray-700'
                                  )}
                                  onClick={logout}
                                >
                                  Sign out
                                </button>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Disclosure>
        {!broken && (
          <div
            className=' absolute top-1/2 -left-4 z-10 -translate-y-1/2 cursor-pointer rounded-full border border-dashed bg-white p-[5px] font-bold text-secondary'
            onClick={() => collapseSidebar()}
            aria-hidden='true'
          >
            {collapsed ? (
              <ArrowRightIcon className='h-4 w-4' />
            ) : (
              <ArrowLeftIcon className='h-4 w-4' />
            )}
          </div>
        )}
      </div>
    </>
  )
}
