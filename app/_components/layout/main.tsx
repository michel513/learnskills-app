import Image from 'next/image'
import heroImage from '@/public/images/e-learning-1.jpg'
import Link from 'next/link'
import Header from './header'
import Footer from './footer'

const HomePage = () => {


    return (
        <div>
            <Header />
            <section className=''>
                <div className='relative isolate h-lvh overflow-hidden pt-20 '>

                    <Image
                        alt=''
                        src={heroImage}
                        className='absolute inset-0 -z-10 h-lvh w-full object-cover'
                    />

                    <div
                        aria-hidden='true'
                        className='absolute inset-0 -z-10 bg-black/70 bg-blend-multiply'
                    />

                    <div className='mx-auto max-w-2xl py-32 -m-20 px-4 sm:py-48 md:px-6 lg:py-56 xl:px-8'>
                        <div className='hidden sm:mb-8 sm:flex sm:justify-center'>
                            <div className='relative rounded-full py-1 px-3 text-sm leading-6 text-stone-400 ring-1 ring-white/10 hover:ring-white/20'>
                                Announcing our next round of funding.{' '}
                                <Link href='#' className='font-semibold text-white'>
                                    <span className='absolute inset-0' aria-hidden='true' />
                                    Read more <span aria-hidden='true'>&rarr;</span>
                                </Link>
                            </div>
                        </div>
                        <div className='text-center'>
                            <h1 className='text-4xl font-bold tracking-tight text-white sm:text-6xl'>
                                Our Courses are greate.
                            </h1>
                            <p className='mt-6 text-lg leading-8 text-stone-300'>
                                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                                lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
                                fugiat aliqua.
                            </p>
                            <div className='mt-10 flex items-center justify-center gap-x-6'>
                                <Link
                                    href='/products'
                                    className='rounded-md bg-sky-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400'
                                >
                                    Learn skils now
                                </Link>
                                <Link
                                    href='#'
                                    className='text-sm font-semibold leading-6 text-white'
                                >
                                    Learn more <span aria-hidden='true'>→</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <Footer />
                </div>
            </section>

        </div>
    )
}

export default HomePage;
