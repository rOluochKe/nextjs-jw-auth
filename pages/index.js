import { useContext } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import Label from '../components/Label'
import FormInput from '../components/FormInput'
import FormSuccess from '../components/FormSuccess'
import FormError from '../components/FormError'
import Button from '../components/Button'
import style from '../styles/Login.module.css'
import Link from 'next/link'
import AuthContext from '../context/AuthContext'

const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required'),
})

export default function LoginPage() {
  const { login, error, user, isLoading } = useContext(AuthContext)

  const handleLoginSubmit = async ({ email, password }) => {
    login({email, password})
  }

  return (
    <>
      <section className={style.form}>
        <div>
          <div className={style.container}>
            <div className={style.formhead}>
              <h3 className={style.title}>Sign in your account</h3>
              <p className={style.subtitle}>
                Don&apos;t have an account?{' '}
                <Link href='/signup'>
                  <a>Sign up now</a>
                </Link>
              </p>
            </div>

            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              onSubmit={(values) => handleLoginSubmit(values)}
              validationSchema={LoginSchema}
            >
              {() => (
                <Form>
                  {user && <FormSuccess text="Login successful" />}
                  {error && <FormError text={error} />}
                  <div>
                    <div className={style.formControl}>
                      <Label text='Email' />
                      <FormInput
                        ariaLabel='Email'
                        name='email'
                        type='email'
                        placeholder='Email'
                      />
                    </div>
                    <div className={style.formControl}>
                      <Label text='Password' />
                      <FormInput
                        ariaLabel='Password'
                        name='password'
                        type='password'
                        placeholder='Password'
                      />
                    </div>
                  </div>
                  <div className='mt-6'>
                    <Button
                      type='submit'
                      text='Log In'
                      loading={isLoading}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <p className={style.footer}>Designed by <span>Calebbenjin.io</span></p>
        </div>
      </section>
    </>
  )
}
