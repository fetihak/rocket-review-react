import React, { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
const ConfirmationModal: React.FC<{
    header: string,
    showButtons: boolean,
    message: string, 
    onConfirm: () => void,
    onCancel: () => void,
     onClose: () => void
}> =
    ({ header, showButtons ,message, onConfirm, onCancel, onClose }) => {
        const [isOpen, setIsOpen] = useState(true);
        const handleCloseModal = () => {
            setIsOpen(false)
            onClose();
        }
        const handleConfirm = () => {
            console.log("here")
            onConfirm();
            //setIsOpen(false)
        }
        return (
            <Transition
                show={isOpen}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
                as={Fragment}
            >
                <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                    <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900">
                                {header}
                            </Dialog.Title>
                            <div className="mt-2">
                                <p className="border-t border-b py-4">
                                    {message}
                                </p>
                            </div>

                            <div className="mt-4">
                                {showButtons &&
                                    <button
                                        onClick={handleConfirm}
                                        type="button"
                                        className="inline-flex 
                                    mr-1
                                    justify-center
                                      px-4 py-2 text-sm
                                      text-white bg-blue-700 
                                      border border-transparent 
                                      rounded-md
                                       hover:bg-red-200 duration-300"
                                    >
                                        Confirm
                                    </button>
                                }
                                <button
                                    onClick={handleCloseModal}
                                    type="button"
                                    className="inline-flex 
                                    justify-center px-4 
                                    py-2 text-sm text-white
                                     bg-red-400 border 
                                     border-transparent 
                                     rounded-md hover:bg-red-200
                                      duration-300"
                                >
                                    Close
                                </button>
                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            </Transition>
        )
    }

export default ConfirmationModal