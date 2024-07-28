import style from "./PageStyle.module.scss";
import { Subscribe } from "../modules/Subscribes/Subscribe";
import { Cart } from '../modules/Cart/Cart';
import classNames from 'classnames';
import { BlogContent } from "../modules/Blog/BlogContent";

const Blog = () => {

  return (
    <>
      <section className={style.blog}>
        <div className={classNames(style.container, "container")}>
          <h1 className={style.title}>Блог</h1>
          <div className={style.contentBlock}>
            <BlogContent />

            <Cart />

          </div>
        </div>
      </section>
      <Subscribe />
    </>
  );
};

export default Blog;




