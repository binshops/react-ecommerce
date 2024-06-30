import React, { FC, useState } from "react";
import styles from "./selectBox.module.scss";
import { selectBoxProps } from "./selectBox.types";
import arrow from "./../../../../../public/images/icon/Chevron.png";
import Image from "next/image";

const SelectBox: FC<selectBoxProps> = ({ productOption }) => {
  const [option, setOption] = useState(productOption.items[0].value);
  const [showMore,setShowMore]=useState(false)
  const SelectOption= (option:string)=>{
    setOption(option)
    setShowMore(!showMore)
  }
  return (
    <div className={styles.selectBox}>
      <div className={styles.selectedOption} onClick={()=>setShowMore(!showMore)}>
        <p>{option}</p>
        <Image src={arrow} alt="arrow" />
      </div>
      <div className={`${styles.moreOption} ${showMore ? styles.show : ''}`}>
        {productOption.items.map((option) => {
          return (
            <p key={option.id} onClick={()=>SelectOption(option.value)}>
              {" "}
              {option.value}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default SelectBox;
