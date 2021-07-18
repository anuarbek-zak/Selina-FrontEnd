import styles from './index.module.scss';

export default function Event({item}){
  return (
    <div className={styles.event}>
      <div style={{'backgroundImage': `url(${item.images[0]})`}} className={styles['bg-img']}></div>
      <div className={`flex flex-column jc-sb`}>
        <h4>{item.name}</h4>
        <p>{item.startDate} - {item.endDate}</p>
        <p>{item.description }</p>
        <div className={`${styles['event-inner']} flex jc-sb ai-c`}>
          <span><img src="https://anuarbek-zak.github.io/projects/Kazakhstan/frontend/assets/img/map.png" alt="Selina"/>{item.areasAtLocation[0] || ""}</span>
          <a href="#" className="read-more ">Join to event</a>
        </div>
      </div>
    </div>
  )
}