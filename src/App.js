import React, { useState, useEffect } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import cx from "classnames";
import Fantom from './views/Fantom';
import Referrals from './views/Referrals';
import Trading from './views/Trading';
import './App.css';
import darkLogoIcon from './img/anzor-logo.png';
import lightLogoIcon from './img/anzor-logo.png';
import { FaTimes } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { RiMenuLine } from 'react-icons/ri';

function AppHeaderLinks({ mode, small, clickCloseIcon }) {
  return (
    <div className="App-header-links">
      {small &&
        <div className="App-header-links-header">
          <div className="App-header-menu-icon-block" onClick={() => clickCloseIcon()}>
            <FiX className="App-header-menu-icon" />
          </div>
          <NavLink exact activeClassName="active" className="App-header-link-main" to="/">
            <img src={darkLogoIcon} alt="SKULL Logo" style={{width: '40px', height: '40px'}} />
          </NavLink>
        </div>
      }
      <div className="App-header-link-container">
        <NavLink to="/" exact className="nav-link" activeClassName="active">Fantom</NavLink>
      </div>
    </div>
  )
}

const App = () => {
  const [mode, setMode] = useState(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(undefined);

  const slideVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0 }
  }

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  useEffect(() => {
    const savedMode = window.localStorage.getItem('mode');
    const targetMode = savedMode == 'light' ? 'light' : 'dark';
    document.querySelector('body').style.backgroundColor = targetMode == 'dark' ? '#000000' : '#f6f9ff';
    setMode(targetMode);
  }, [])

  return (
    <Switch>
      {
        mode && <div className={cx("App", mode)}>
          {isDrawerVisible &&
            <AnimatePresence>
              {isDrawerVisible &&
                <motion.div className="App-header-backdrop"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={fadeVariants}
                  transition={{ duration: 0.2 }}
                  onClick={() => setIsDrawerVisible(!isDrawerVisible)}
                >
                </motion.div>
              }
            </AnimatePresence>
          }
          <div className="nav">
            <div className="nav-left">
              <div className="App-header-menu-icon-block" onClick={() => setIsDrawerVisible(!isDrawerVisible)}>
                {!isDrawerVisible && <RiMenuLine className="App-header-menu-icon" />}
                {isDrawerVisible && <FaTimes className="App-header-menu-icon" />}
              </div>
              <a href="https://cranium.exchange" target="_blank" rel="noreferrer" className="nav-logo" style={{textDecoration: 'none', alignItems: 'center'}}>
                <img style={{width: '40px', height: '40px'}} src={mode == 'dark' ? darkLogoIcon : lightLogoIcon} />
                <p style={{textDecoration: 'none', fontSize: '1.3rem', fontWeight: '40px'}}>Cranium</p>
              </a>
              {/* <NavLink to="/" style={{paddingRight: "12px"}} exact className="nav-link" activeClassName="active">Fantom</NavLink> */}
            </div>
            <div className="nav-right">
              <a href="https://docs.cranium.exchange" target="_blank" rel="noreferrer" className="nav-link">Docs</a>
              <a href="https://cranium.exchange" target="_blank" rel="noreferrer" className="nav-link">Launch App</a>
            </div>
          </div>
          <AnimatePresence>
            {isDrawerVisible &&
              <motion.div
                onClick={() => setIsDrawerVisible(false)}
                className="App-header-links-container App-header-drawer"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={slideVariants}
                transition={{ duration: 0.2 }}
              >
                <AppHeaderLinks mode={mode} small clickCloseIcon={() => setIsDrawerVisible(false)} />
              </motion.div>
            }
          </AnimatePresence>
          <div className="content">
            <Route exact path="/" render={(props) => (
              <Fantom {...props} mode={mode} />
            )} />
            <Route exact path="/referrals/:chainName" render={(props) => (
              <Referrals {...props} mode={mode} />
            )} />
            <Route exact path="/trading" component={Trading} />
          </div>
        </div>
      }
    </Switch>
  )
};

export default App;
