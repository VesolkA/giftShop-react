import style from "./PageStyle.module.scss";
import { Subscribe } from "../modules/Subscribes/Subscribe";
import { Cart } from '../modules/Cart/Cart';
import classNames from 'classnames';
import { Contacts } from "../modules/Contacts/Contacts";
import MapComponent from "../modules/Map/Map";

const About = () => {

  return (
    <>
      <section className={style.blog}>
        <div className={classNames(style.container, "container")}>
          <h1 className={style.title}>О нас</h1>
          <div className={style.contentBlockAbout}>
            <div className={style.blockAbout}>
              <p className={style.textAbout}>
                Добро пожаловать в наш онлайн-магазин, где каждый ваш заказ становится особенным! Мы специализируемся на продаже красивейших букетов, очаровательных открыток и мягких игрушек, которые приносят радость и тепло в любой дом.
              </p>
              <p className={style.textAbout}>
                <b>Наша команда</b> — это настоящие мастера своего дела. Мы тщательно подбираем только самые свежие и качественные цветы, чтобы каждый букет дарил радость и сохранял свою красоту как можно дольше. Открытки, которые вы найдёте у нас, разработаны талантливыми дизайнерами и могут стать идеальным дополнением к вашему подарку. А наши мягкие игрушки подарят уют и будут напоминанием о вашей заботе.
              </p>
              <p className={style.textAbout}>
                Мы ценим каждого клиента и стремимся сделать ваш опыт покупок у нас приятным и удобным. Наши услуги доставки оперативны и надёжны, а наши менеджеры всегда готовы помочь вам с выбором и ответить на все вопросы.
              </p>
              <p className={style.textAbout}>
                Спасибо, что выбрали нас! Позвольте нам стать частью ваших радостных моментов и помогите нам сделать мир немного счастливее вместе с вами.
              </p>
              <div className={style.contantInfo}>
                {/* <h3 className={style.contactTitle}>Контактные данные:</h3> */}
              <p className={style.textAbout}><b>Офис и пункт самовывоза:</b> г.Минск, пр. Дзержинского, 146-2</p>
              <p className={style.textAbout}> OOO &quot;МИРАНО БЕЛ&quot;</p>
              <p className={style.textAbout}>УНП: 945865236</p>
              <p className={style.textAbout}>тел. офис/факс: +375 29 3456799</p>
              <p className={style.textAbout}>тел администрации: +375 29 4581254</p>
              </div>
              
              <MapComponent />
            </div>
            
            <Cart />
          </div>
        </div>
      </section>
      <Contacts />
      <Subscribe />
    </>
  );
};

export default About;