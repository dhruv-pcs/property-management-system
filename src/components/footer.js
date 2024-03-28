// import styles from '@styles-page/footer.module.css';
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";



const Footer = () => {
    return (
      <>
        <footer class="bg-body-tertiary text-center text-lg-start">
  <div class="text-center p-3">
    © 2024, Made with ❤️ by &nbsp;
    <a class="text-primary" href="https://www.codenticsoftware.com/">Codentic Software</a> &nbsp; &nbsp;
  
   <a href="https://www.facebook.com/codentic.software"><FaFacebook class=' text-secondary'/></a>&nbsp; 
   <a href="https://www.linkedin.com/company/codentic-software"><FaLinkedin class=' text-secondary'/></a>&nbsp;
   <a href="https://www.instagram.com/codentic.software/"><FaInstagramSquare class=' text-secondary'/></a>&nbsp;



  </div>
  
</footer>
      </>
    )
  }
  
  export default Footer