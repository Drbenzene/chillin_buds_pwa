
import { Fragment, useState } from 'react'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { CheckIcon } from '@heroicons/react/20/solid'

const product = {
  name: 'Everyday Ruck Snack',
  price: '$220',
  rating: 3.9,
  href: '#',
  imageSrc: 'https://images.unsplash.com/photo-1612995923001-27d03779d023?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80',
  imageAlt: 'Interior of light green canvas bag with padded laptop sleeve and internal organization pouch.',
  sizes: [
    { name: '18L', description: 'Perfect for a reasonable amount of snacks.' },
    { name: '20L', description: 'Enough room for a serious amount of snacks.' },
  ],
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductView({ open, setOpen, details }: any) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])

  console.log(details, "IN QUICK VIEW")
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
                    <div className="sm:col-span-4 lg:col-span-5">
                      <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100">
                        <img src={details?.image || "https://images.unsplash.com/photo-1612995923001-27d03779d023?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80" }/>
                      </div>
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                      <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{details?.name}</h2>

                      <section aria-labelledby="information-heading" className="mt-4">
                        <h3 id="information-heading" className="sr-only">
                          Product information
                        </h3>

                        {/* <div className="flex items-center">
                          <p className="text-lg text-gray-900 sm:text-xl">{product.price}</p>
                        </div> */}

                        <div className="flex justify-between items-center my-3 flex-wrap">
                          <p className="p-3 rounded-2xl bg-gray-300 font-bold my-2">
                            THC: {details?.thc || '-'}
                          </p>
                          <p className="p-3 rounded-2xl bg-gray-300 font-bold my-2">
                            CBD: {details?.cbd || '-'}
                          </p>
                          <p className="p-3 rounded-2xl bg-gray-300 font-bold my-2">
                            Terpene %: {details?.terpene_percent || "-"}
                          </p>

                          {
                            details?.indica === "TRUE" && (
                              <p className="p-3 rounded-2xl bg-gray-300 font-bold my-2">
                                Indica
                              </p>
                            )
                          }

                          {
                            details?.landrace === "TRUE" && (
                              <p className="p-3 rounded-2xl bg-gray-300 font-bold my-2">
                                Landrace
                              </p>
                            )
                          }

                          {
                            details?.sativa === "TRUE" && (
                              <p className="p-3 rounded-2xl bg-gray-300 font-bold my-2">
                                Sativa
                              </p>
                            )
                          }

                        </div>


                        {
                          details?.terpenes && (
                            <div className="mt-4 flex items-center">
                              <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                              <p className="ml-2 font-medium text-gray-500">Terpenes: {details.terpenes}</p>
                            </div>
                          )
                        }

                        {
                          details?.genetic_makeup && (
                            <div className="mt-4 flex items-center">
                              <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                              <p className="ml-2 font-medium text-gray-500">Genetic Makeup: {details.genetic_makeup}</p>
                            </div>
                          )
                        }

                        {
                          details?.flavours && (
                            <div className="mt-4 flex items-center">
                              <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                              <p className="ml-2 font-medium text-gray-500">Flavours: {details.flavours}</p>
                            </div>
                          )
                        }

                        {
                          details?.effects && (
                            <div className="mt-4 flex items-center">
                              <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                              <p className="ml-2 font-medium text-gray-500">Effects: {details.effects}</p>
                            </div>
                          )
                        }

{
                          details?.helps && (
                            <div className="mt-4 flex items-center">
                              <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                              <p className="ml-2 font-medium text-gray-500">Help: {details.helps}</p>
                            </div>
                          )
                        }

{
                          details?.head_body && (
                            <div className="mt-4 flex items-center">
                              <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                              <p className="ml-2 font-medium text-gray-500">Head or Body High: {details.head_body}</p>
                            </div>
                          )
                        }

                        {
                          details?.originate && (
                            <div className="mt-4 flex items-center">
                              <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                              <p className="ml-2 font-medium text-gray-500">Originate: {details.originate}</p>
                            </div>
                          )
                        }

                        
{
                          details?.description && (
                            <div className="mt-4 flex items-center">
                              <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                              <p className="ml-2 font-medium text-gray-500">Originate: {details.description}</p>
                            </div>
                          )
                        }

{
                          details?.apetite && (
                            <div className="mt-4 flex items-center">
                              <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                              <p className="ml-2 font-medium text-gray-500">Originate: {details.apetite}</p>
                            </div>
                          )
                        }
                      </section>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
