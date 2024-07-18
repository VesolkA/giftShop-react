import classNames from "classnames";
import style from './Choices.module.scss';
import { useEffect, useRef } from "react";
import { adjustElementPosition, debounce } from "../../util";

export const Choices = ({ 
  children, buttonLabel, className, isOpen, onToggle,
   }) => {
    
    const choiceRef = useRef(null); 

    useEffect(() => {
      if (isOpen) {
        adjustElementPosition(choiceRef.current);
      }
  
      const debAdjustElementPosition = debounce(() => {
        if (isOpen) {
          adjustElementPosition(choiceRef.current);
        }
      }, 100);
  
      window.addEventListener("resize", debAdjustElementPosition);
  
      return () => {
        window.removeEventListener("resize", debAdjustElementPosition);
      };
    }, [isOpen]);


    return (
    <div className={classNames(style.choices, className)}>
      <button className={style.btn} type="button" onClick={onToggle}>
        {buttonLabel}
      </button>

      {isOpen && <div className={classNames(style.box, "filter__choices-box")}  ref={choiceRef}>{children}</div>}
    </div>
  );}

