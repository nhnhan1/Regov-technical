import { yupResolver } from '@hookform/resolvers/yup'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Input from 'src/components/Input'
import { AdminAccount } from 'src/constants/utils'
import { AppContext } from 'src/contexts/app.context'
import { saveAccessTokenToLS } from 'src/utils/auth'
import { LoginShema, Schema } from 'src/utils/rules'
type FormData = Pick<Schema, 'email' | 'password'>

export default function Login() {
  const navigate = useNavigate()
  const { setIsAuthenticated } = useContext(AppContext)

  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(LoginShema)
  })

  const onSubmit = handleSubmit(async (data) => {
    if (
      data.email === AdminAccount.email &&
      data.password === AdminAccount.password
    ) {
      navigate('/')
      saveAccessTokenToLS(AdminAccount.email)
      setErrorMessage(null)
      setIsAuthenticated(true)
    } else {
      setErrorMessage('Email or Password wrong')
    }
  })
  return (
    <div className='h-[100vh]'>
      <div className='flex h-full items-center justify-center bg-login bg-cover bg-no-repeat '>
        <form
          className=' w-[440px] overflow-y-auto rounded-lg border bg-white px-7 py-10 shadow-sm'
          onSubmit={onSubmit}
        >
          <div className='mb-14 text-center text-3xl font-bold'>Sign In</div>
          <div className='mb-4 flex rounded-md bg-blue-200 px-2 py-2 text-sm'>
            <p>Use email:</p>
            <p className='font-bold'>{AdminAccount.email} </p>
            <p> / password:</p>
            <p className='font-bold'> {AdminAccount.password}</p>
          </div>

          {errorMessage && (
            <div className='mb-5 rounded-md bg-red-400 px-2 py-2'>
              <p className=' text-sm text-white'>{errorMessage}</p>
            </div>
          )}
          <div className='overflow-y-auto'>
            <Input
              name='email'
              register={register}
              type='text'
              errorMessage={errors.email?.message}
              placeholder='Email'
              autoComplete='on'
            />
            <Input
              name='password'
              register={register}
              type='password'
              className='relative'
              errorMessage={errors.password?.message}
              placeholder='Password'
              autoComplete='on'
            />
            <div className='mt-8'>
              <button
                type='submit'
                className='flex w-full items-center justify-center rounded-lg bg-secondary py-3 px-2  text-sm uppercase text-white opacity-80 hover:opacity-100'
                // isLoading={LoginMutation.isLoading}
                // disabled={LoginMutation.isLoading}
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
