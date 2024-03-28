// import styles from '@styles-page/footer.module.css';
import { FaFacebook, FaLinkedin } from 'react-icons/fa'
import { FaInstagramSquare } from 'react-icons/fa'

const Footer = () => {
  return (
    <>
      <footer className='bg-body-tertiary text-center text-lg-start'>
        <div className='text-center p-3'>
          © 2024, Made with ❤️ by &nbsp;
          <a className='text-primary' href='https://www.codenticsoftware.com/'>
            Codentic Software
          </a>{' '}
          &nbsp; &nbsp;
          <a href='https://www.facebook.com/codentic.software'>
            <FaFacebook className=' text-secondary' />
          </a>
          &nbsp;
          <a href='https://www.linkedin.com/company/codentic-software'>
            <FaLinkedin className=' text-secondary' />
          </a>
          &nbsp;
          <a href='https://www.instagram.com/codentic.software/'>
            <FaInstagramSquare className=' text-secondary' />
          </a>
          &nbsp;
        </div>
      </footer>
    </>
  )
}

export default Footer
