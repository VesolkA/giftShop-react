import classNames from 'classnames';
import style from './Contacts.module.scss';


export const Contacts = () => (

  <section className={style.contact}>
    <div className={classNames('container')}>

      <div className={style.information}>
        <span className={classNames(style.info, style.address)}>г.Минск, пр. Дзержинского, 146-2</span>

        <a className={classNames(style.info, style.email)}
          href="mailto:miracleshop@gmail.com" >miranoshop@gmail.com</a>

        <a className={classNames(style.info, style.phone)} href="tel:+37529123456799">+375 29 3456799</a>
      </div>

    </div>

  </section>

);