import styles from './index.module.scss';

export default function Event({item}){
  return (
    <div className={styles.event}>
      <img src={item.images[0]} width={100} height={100} className="bg-img"/>
      <div className={`flex flex-column jc-sb`}>
        <h4 className="">{item.name}</h4>
        <p className="">{item.startDate} - {item.endDate}</p>
        <p className="">{item.description }</p>
        <div className="flex jc-sb ai-c">
          <span className=""><img src="https://anuarbek-zak.github.io/projects/Kazakhstan/frontend/assets/img/map.png"/>{item.areasAtLocation[0] || ""}</span>
          <a className="read-more ">Read more</a>
        </div>
      </div>
    </div>
  )
}