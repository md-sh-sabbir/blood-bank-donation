import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import useAxios from '../../../hooks/useAxios'
import { toast } from 'react-toastify'

const UpdateStatusModal = ({ isOpen, closeModal, req, refetch }) => {
  const [updatedStatus, setUpdatedStatus] = useState(req?.donationStatus)
  const axiosSecure = useAxios()

  const handleStatusUpdate = async () => {
    try {
      const response = await axiosSecure.patch('/update-status', {
        id: req?._id,
        donationStatus: updatedStatus
      })
      
      if (response.data.modifiedCount > 0) {
        toast.success('Status Updated Successfully!')
        refetch()
        closeModal()
      } else {
        toast.error('No changes made')
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || 'Failed to update status')
    }
  }

  return (
    <>
      <Dialog
        open={isOpen}
        as='div'
        className='relative z-10 focus:outline-none'
        onClose={closeModal}
      >
        <div className='fixed inset-0 bg-black/30 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4'>
            <DialogPanel
              transition
              className='w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl'
            >
              <DialogTitle
                as='h3'
                className='text-xl font-bold text-gray-800 mb-4'
              >
                Update Donation Status
              </DialogTitle>
              
              {/* Request Details */}
              <div className='mb-4 p-3 bg-gray-50 rounded-lg'>
                <p className='text-sm text-gray-600 mb-1'>
                  <span className='font-semibold'>Recipient:</span> {req?.recipientName}
                </p>
                <p className='text-sm text-gray-600 mb-1'>
                  <span className='font-semibold'>Blood Group:</span> {req?.bloodGroup}
                </p>
                <p className='text-sm text-gray-600'>
                  <span className='font-semibold'>Current Status:</span>{' '}
                  <span className='capitalize'>{req?.donationStatus}</span>
                </p>
              </div>

              <form>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Select New Status:
                  </label>
                  <select
                    value={updatedStatus}
                    onChange={e => setUpdatedStatus(e.target.value)}
                    className='w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EA1241] focus:border-transparent'
                    name='status'
                  >
                    <option value='pending'>Pending</option>
                    <option value='inprogress'>In Progress</option>
                    <option value='done'>Done</option>
                    <option value='canceled'>Canceled</option>
                  </select>
                </div>
                
                <div className='flex mt-6 gap-3'>
                  <button
                    onClick={handleStatusUpdate}
                    type='button'
                    className='flex-1 cursor-pointer inline-flex justify-center rounded-lg border border-transparent bg-[#EA1241] px-4 py-3 text-sm font-semibold text-white hover:bg-[#d10f38] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EA1241] focus-visible:ring-offset-2 transition-colors duration-200'
                  >
                    Update Status
                  </button>
                  <button
                    type='button'
                    className='flex-1 cursor-pointer inline-flex justify-center rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 transition-colors duration-200'
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default UpdateStatusModal