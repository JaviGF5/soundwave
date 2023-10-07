import React from 'react';
import { LeftMenu, TopNav, Footer  } from '../../components/Layout';
import styles from './LoggedLayout.module.css';
import { InfoButton } from '../../components/Shared/InfoButton/InfoButton';


export function LoggedLayout(props) {

  const { children } = props;

  
  return (
    <div className={ styles.content }>

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

      <div className={ styles.InfoButton }>
        <InfoButton />
      </div>
      
      <div className={ styles.footer }>
        <Footer />
      </div>

    </div>

  )
}
