import React, { useState } from 'react'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div className={`container-fluid p-0 ${isOpen ? 'open' : ''}`}>
        <div className='row flex-nowrap'>
          <div className='bg-dark  min-vh-100 d-flex flex-column justify-content-between'>
            <div className='bg-dark p-2'>
              <a className='d-flex text-decoration-none mt-1 align-items-center text-white'>
                <span className='fs-4 d-none d-sm-inline'>Logo</span>
                <button className=' bg-none' onClick={handleToggle}>
                  X
                </button>
              </a>
              <ul className='nav nav-pills flex-column mt-4'>
                <li className='nav-item py-2 py-sm-0 '>
                  <a href='#' className='icon-link icon-link-hover nav-link text-white'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='currentColor'
                      className='bi bi-speedometer'
                      viewBox='0 0 16 16'
                    >
                      <path d='M8 2a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2M3.732 3.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707M2 8a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.39.39 0 0 0-.527-.02L7.547 7.31A.91.91 0 1 0 8.85 8.569l3.434-4.297a.39.39 0 0 0-.029-.518z' />
                      <path
                        fillRule='evenodd'
                        d='M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.95 11.95 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0'
                      />
                    </svg>
                    <span className='icon-link icon-link-hover fs-4 d-none ms-3 d-sm-inline'>Dashboard</span>
                  </a>
                </li>

                <li className='nav-item py-2 py-sm-0 '>
                  <a href='#' className='icon-link icon-link-hover nav-link text-white'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='currentColor'
                      className='bi bi-house'
                      viewBox='0 0 16 16'
                    >
                      <path d='M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z' />
                    </svg>
                    <span className='icon-link icon-link-hover fs-4 d-none ms-3 d-sm-inline'>Admins</span>
                  </a>
                </li>
                <li className='nav-item py-2 py-sm-0 '>
                  <a href='#' className='icon-link icon-link-hover nav-link text-white'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='currentColor'
                      className='bi bi-shield-shaded'
                      viewBox='0 0 16 16'
                    >
                      <path
                        fillRule='evenodd'
                        d='M8 14.933a1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56'
                      />
                    </svg>
                    <span className='icon-link icon-link-hover fs-4 d-none ms-3 d-sm-inline'>Roles & Permission</span>
                  </a>
                </li>

                <li className='nav-item py-2 py-sm-0 '>
                  <a href='#' className='icon-link icon-link-hover nav-link text-white'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='currentColor'
                      className='bi bi-person-circle'
                      viewBox='0 0 16 16'
                    >
                      <path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0' />
                      <path
                        fillRule='evenodd'
                        d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1'
                      />
                    </svg>
                    <span className='icon-link icon-link-hover fs-4 d-none ms-3 d-sm-inline'>Owner</span>
                  </a>
                </li>
                <li className='nav-item py-2 py-sm-0 '>
                  <a href='#' className='icon-link icon-link-hover nav-link text-white'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='currentColor'
                      className='bi bi-people-fill'
                      viewBox='0 0 16 16'
                    >
                      <path d='M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5' />
                    </svg>
                    <span className='icon-link icon-link-hover fs-4 d-none ms-3 d-sm-inline'>Customer</span>
                  </a>
                </li>
                <li className='nav-item py-2 py-sm-0 '>
                  <a href='#' className='icon-link icon-link-hover nav-link text-white'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='currentColor'
                      className='bi bi-buildings'
                      viewBox='0 0 16 16'
                    >
                      <path d='M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022M6 8.694 1 10.36V15h5zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5z' />
                      <path d='M2 11h1v1H2zm2 0h1v1H4zm-2 2h1v1H2zm2 0h1v1H4zm4-4h1v1H8zm2 0h1v1h-1zm-2 2h1v1H8zm2 0h1v1h-1zm2-2h1v1h-1zm0 2h1v1h-1zM8 7h1v1H8zm2 0h1v1h-1zm2 0h1v1h-1zM8 5h1v1H8zm2 0h1v1h-1zm2 0h1v1h-1zm0-2h1v1h-1z' />
                    </svg>
                    <span className='icon-link icon-link-hover fs-4 d-none ms-3 d-sm-inline'>Property</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
