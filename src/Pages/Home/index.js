import styles from './index.module.scss';

export default function Home(){
  return (
    <div className={styles.home}>
      <h1>Unique Destinations Around the World</h1>
      <img src="https://selina-res.cloudinary.com/image/upload/if_iw_gt_1848,c_scale,w_1848/e_sharpen:80,q_auto:good/f_auto/v1/s-cf-1/xdw7oj4u3s4v/5Js92k6mVQiO1PNdrEy05H/33c1bd9ac91f49114f17447763d7b941/10.jpg" alt="Selina"/>
    </div>
  )
}