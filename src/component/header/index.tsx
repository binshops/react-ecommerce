import React, { FC } from 'react';
import logo from './../../../public/images/logo.png';
import styles from './header.module.scss';
import Image from 'next/image';

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}> 
        <Image src={logo} alt="" />                     
      </div>
    </header>
  );
};

export default Header;
