import React from 'react'

function Fetching() {
    return (
        <div className='h-screen mx-auto justify-center items-center flex'>
            <div>
                <svg className="animate-spin ml-1 mr-3 h-10 w-10 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 2.21.896 4.21 2.344 5.648l2.657-2.357z"></path>
                </svg>
            </div>
            <div>
                Fetching data...
            </div>
        </div>
    )
}

export default Fetching