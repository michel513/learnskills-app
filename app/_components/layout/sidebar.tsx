
import { SignInButton, SignedOut } from "@clerk/nextjs";
import { BookIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import useSWR from 'swr';

const SidebarHeader = () => {
   const { data: cart, isLoading } = useSWR('cart', );
   const [cartSliderIsOpen, setCartSliderIsOpen] = useState(false);

    return ( 
        <div>
           <div>
               <div>
                  <Link
                  href='/'
                  className='text-2xl font-bold uppercase tracking-widest'
                  >
                  LEARNSKILLS
                  </Link>
               </div>
           </div>
           <div>
               <ul className='flex items-center gap-10'>

                     <li className='text-sm font-medium uppercase tracking-wider'>
                     <Link href='/'>Courses</Link>
                     </li>
                  
                     <li className='text-sm font-medium uppercase tracking-wider'>
                        <Link href='/'>A propos</Link>
                     </li>

                     <li className='text-sm font-medium uppercase tracking-wider'>
                        <Link href='/'>Contacts</Link>
                  </li>
                  
               </ul>
               <div className='flex items-center justify-between gap-6'>
                     <button
                        className='flex items-center gap-x-2 pl-4'
                        onClick={() => setCartSliderIsOpen(open => !open)}
                        >
                        Learn's now 
                        <BookIcon className='h-7 w-7' />

                        {cart?.item_quantity ? (
                           <span className='flex h-5 w-5 items-center justify-center rounded bg-sky-600 text-xs font-medium text-white'>
                              {cart?.item_quantity}
                           </span>
                        ) : null}
                     </button>
                     <SignedOut>
                     <SignInButton mode='modal'>
                        <button className='rounded border border-gray-400 px-3 py-0.5'>
                           Sign in
                        </button>
                     </SignInButton>
                     </SignedOut>
                 </div>
           </div>
        </div>
     );
}
 
export default SidebarHeader;

