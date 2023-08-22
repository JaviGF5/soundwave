import React from 'react';
import { LeftMenu, TopNav, Footer  } from '../../components/Layout';
import styles from './LoggedLayout.module.css';


export function LoggedLayout(props) {

  const { children } = props;

  return (
    <div className={ styles.contentGeneral }>

      <div className={ styles.layoutContent }>

        <div className={ styles.leftMenu }>
          <LeftMenu />
        </div>

        <div className={ styles.childrenContent }>

          <div className={ styles.navbar }>
            <TopNav />
          </div>

          <div className={ styles.pages }>{ children }</div>

        </div>
      </div>

      <div className={ styles.footer }>
        <Footer />
      </div>

    </div>

  )
}
