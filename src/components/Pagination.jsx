import React from 'react'

export const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

    const nextPage = () => {
        if (currentPage !== nPages) setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if (currentPage !== 1) setCurrentPage(currentPage - 1)
    }

    return (
        <nav>
            <div className="my-4">
                <ol className="flex justify-center space-x-1 text-md font-medium">
                    <li
                        className={`inline-flex items-center justify-center w-8 h-8 border border-gray-100 rounded-full`}
                        onClick={prevPage}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3 h-3"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </li>
                    {pageNumbers.map(pgNumber => (
                        <li key={pgNumber}
                            className={`block w-8 h-8 leading-8 text-center border border-gray-100 rounded-full  ${currentPage === pgNumber ? 'text-black bg-blue-300' : 'text-green-600'}`} onClick={() => setCurrentPage(pgNumber)}
                        >
                            {pgNumber}

                        </li>
                    ))}
                    <li
                        className={`inline-flex items-center justify-center w-8 h-8 border border-gray-100 rounded-full`}
                        onClick={nextPage}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3 h-3"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </li>
                </ol>
            </div>
        </nav>
    )
}