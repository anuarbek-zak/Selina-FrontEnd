import styles from './index.module.scss';

export default function Footer({countries}){
  return (
   <footer >
    <div className={`${styles['footer-big']} flex jc-c`}>
      <div className={styles['column']}>
        <h4>company</h4>
        <ul>
          <li>About</li>
          <li>Culture and traditions</li>
          <li>Tourism</li>
          <li>Leader of the Nation</li>
        </ul>
      </div>
      <div className={styles['column']}>
        <h4>company</h4>
        <ul>
          <li>About</li>
          <li>Culture and traditions</li>
          <li>Tourism</li>
          <li>Leader of the Nation</li>
        </ul>
      </div>
      <div className={styles['column']}>
        <h4>company</h4>
        <ul>
          <li>About</li>
          <li>Culture and traditions</li>
          <li>Tourism</li>
          <li>Leader of the Nation</li>
        </ul>
      </div>
      <div className={styles['column']}>
        <h4>company</h4>
        <ul>
          <li>About</li>
          <li>Culture and traditions</li>
          <li>Tourism</li>
          <li>Leader of the Nation</li>
        </ul>
      </div>
    </div>
    <div className={styles['footer-small']}>&copy; All rights reserved.</div>
   </footer>
  )
}