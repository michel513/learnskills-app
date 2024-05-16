'use client'

import { useState } from 'react';


import Link from 'next/link'
import useSWR from 'swr';

import { BarChart3Icon, BookIcon, XIcon } from 'lucide-react';
import { Dialog } from '@headlessui/react';

const navigation = [
  { name: 'Courses', href: '#' },
  { name: 'About', href: '#' },
  { name: 'Contacts', href: '#' },
  { name: 'Company', href: '#' },
]

const Header = () => {
  const { data: cart, isLoading } = useSWR('cart',)
  const [cartSliderIsOpen, setCartSliderIsOpen] = useState(false);

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50 pb-10  text-stone-400">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1 gap-x-5">
            <a href="#" className="-m-1.5 p-1.5">
              <img
                className="flex h-8 w-auto  lg:hidden"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <Link
              href='/'
              className=' text-2xl font-bold uppercase tracking-widest hidden lg:flex lg:flex-1 '
            >
              LEARNSKILLS
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 "
              onClick={() => setCartSliderIsOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <BarChart3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 tracking-widest">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden transition-all ease-in-out lg:flex gap-x-9 lg:flex-1 lg:justify-end">
           
            <a href="#" className="text-sm font-semibold leading-6 tracking-wider">

              <button className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 tracking-widest'>
                Log in <span aria-hidden="true">&rarr;</span>
              </button>

            </a>
          </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={cartSliderIsOpen} onClose={setCartSliderIsOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setCartSliderIsOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base tracking-wider font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6 ">
                  <button
                    className='flex items-center '
                    onClick={() => setCartSliderIsOpen(open => !open)}
                  >
                    Learn's now
                    <BookIcon className='h-7 w-7' />

                    {cart?.item_quantity ? (
                      <span className='flex h-5 w-5 items-center justify-center rounded text-xs font-medium text-white'>
                        {cart?.item_quantity}
                      </span>
                    ) : null}
                  </button>

                  <button className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 tracking-widest hover:bg-gray-50'>
                    Sign in
                  </button>

                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

    </>
  )
}

export default Header

