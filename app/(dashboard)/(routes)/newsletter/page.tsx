

const Newsletter = () => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid-cols-1 gap-x-8 gap-y-16  lg:grid-cols-2">
              <div className="max-w-xl lg:max-w-xl">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Want platform news and updates?
                    Sign up for the newsletter.
                </h2>
                
                <div className="mt-6 flex max-w-md gap-x-4">
                  <label htmlFor="email-address" className="sr-only">
                    Enter your email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    placeholder="Enter your email"
                  />
                  <button
                    type="submit"
                    className="flex-none rounded-md bg-sky-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
              <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
              </dl>
            </div>
          </div>
        </div>
      )
}
 
export default Newsletter;

