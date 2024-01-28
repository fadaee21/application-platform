import { Disclosure } from '@headlessui/react'
// import { MenuIcon, XIcon } from '@heroicons/react/outline'


function Sidebar({ children }: TChildren) {
    return (
        <>
            <Disclosure as="nav" className="bg-gray-800">
                {({ open }) => (
                    <>
                        <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
                            <div className="relative flex items-center justify-between h-16">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        {open ? (
                                            <img src='./assets/icons/bars-3.svg' className="block w-6 h-6" aria-hidden="true" />
                                        ) : (
                                            <img src='./assets/icons/x-mark-3.svg' className="block w-6 h-6" aria-hidden="true" />

                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
                                    <div className="flex items-center flex-shrink-0">
                                        <img
                                            className="block w-auto h-8 lg:hidden"
                                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                                            alt="Workflow"
                                        />
                                        <img
                                            className="hidden w-auto h-8 lg:block"
                                            src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                                            alt="Workflow"
                                        />
                                    </div>
                                    <div className="hidden sm:block sm:ml-6">
                                        <div className="flex space-x-4">
                                            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                                            <a href="#" className="px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-md">Dashboard</a>
                                            <a href="#" className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">Team</a>
                                            <a href="#" className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">Projects</a>
                                            <a href="#" className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">Calendar</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </Disclosure>
            {children}
        </>
    )
}

export default Sidebar
