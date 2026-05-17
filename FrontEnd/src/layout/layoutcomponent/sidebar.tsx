import { FC, Fragment, useEffect, useState } from 'react';
import { imagesData } from '../../common/commonimages';
import { Link, useLocation } from 'react-router-dom';
import store from '../../common/redux/store';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Menuloop from './Menuloop';
import { connect } from 'react-redux';
import { ThemeChanger } from '../../common/redux/action';
import { MENUITEMS, Menuitemtype } from '../../common/sidemenu';
import SimpleBar from 'simplebar-react';
import { useAuth } from '../../auth/useAuth';

export function closeMenuRecursively(items: any) {
  items?.forEach((item: any) => {
    item.active = false;
    closeMenuRecursively(item.children);
  });
};

interface actiontype {
  local_varaiable: any;
  ThemeChanger: (action: any) => void;
}

const Sidebar: FC<actiontype> = ({ local_varaiable, ThemeChanger }) => {

  const location = useLocation();
  const { hasPermission } = useAuth();

  // Filtrar los items del menú según permisos
  const filterMenuItems = (items: Menuitemtype[]): Menuitemtype[] => {
    return items
      .filter(item => !item.requirePermission || hasPermission(item.requirePermission))
      .map(item => ({
        ...item,
        children: item.children ? filterMenuItems(item.children) : undefined
      }))
      // Si un item tiene hijos pero después de filtrar se queda sin ninguno, y no es un link, lo quitamos
      .filter(item => (item.type !== 'sub' || (item.children && item.children.length > 0)));
  };

  const [menuitems, setMenuitems] = useState<Menuitemtype[]>(filterMenuItems(MENUITEMS));

  useEffect(() => {
    // Si los permisos cambian, refrescar el menú
    setMenuitems(filterMenuItems(MENUITEMS));
  }, [hasPermission]);

  function closeMenuFn() {

    closeMenuRecursively(menuitems);

    setMenuitems((arr: any) => [...arr]);
  }

  useEffect(() => {

    const mainContent: any = document.querySelector(".main-content");
    mainContent.addEventListener('click', menuClose);
    window.addEventListener('resize', menuResizeFn);


  }, []);


  function Onhover() {
    const theme = store.getState();
    if ((theme.toggled == 'icon-overlay-close' || theme.toggled == 'detached-close') && theme.iconoverlay != 'open') {
      ThemeChanger({ ...theme, "iconoverlay": "open" });
    }
  }
  function Outhover() {
    const theme = store.getState();
    if ((theme.toggled == 'icon-overlay-close' || theme.toggled == 'detached-close') && theme.iconoverlay == 'open') {
      ThemeChanger({ ...theme, "iconoverlay": "" });
    }
  }

  function menuClose() {

    const theme = store.getState();
    if (window.innerWidth <= 992) {
      ThemeChanger({ ...theme, toggled: "close" });
    }

    if (theme.dataverticalstyle == 'overlay'  && theme.iconoverlay == 'open') {
      ThemeChanger({ ...theme, iconoverlay: "close" });
    }

    if (theme.datanavlayout == 'horizontal' || theme.datanavstyle == 'menu-click' || theme.datanavstyle == 'icon-click') {
      closeMenuFn();
    }

    const MainContent = document.querySelector(".main-content");

    if (local_varaiable.dataverticalstyle === 'icontext' && local_varaiable.icontext !== '') {
      const theme = store.getState();
      ThemeChanger({ ...theme, "icontext": "open" });

      MainContent?.addEventListener("click", (_event) => {
        const theme = store.getState();
        ThemeChanger({ ...theme, "icontext": "" });
      });
    }
    if (theme.dataverticalstyle == 'icontext' || theme.toggled == 'icon-text-open') {
      ThemeChanger({ ...theme, icontext: "" });
    }

  }

  const WindowPreSize = [window.innerWidth]

  function menuResizeFn() {

    WindowPreSize.push(window.innerWidth);
    if (WindowPreSize.length > 2) { WindowPreSize.shift() }
    const theme = store.getState();
    if (WindowPreSize.length > 1) {
      if ((WindowPreSize[WindowPreSize.length - 1] < 992) && (WindowPreSize[WindowPreSize.length - 2] >= 992)) {
        // less than 992;
        ThemeChanger({ ...theme, toggled: "close" });
      }

      if ((WindowPreSize[WindowPreSize.length - 1] >= 992) && (WindowPreSize[WindowPreSize.length - 2] < 992)) {
        // greater than 992
        ThemeChanger({ ...theme, toggled: theme.dataverticalstyle == "doublemenu" ? "double-menu-open" : "" });
      }
    }
  }

  function switcherArrowFn(): void {

    // Used to remove is-expanded class and remove class on clicking arrow buttons
    function slideClick(): void {
      const slide = document.querySelectorAll<HTMLElement>(".slide");
      const slideMenu = document.querySelectorAll<HTMLElement>(".slide-menu");

      slide.forEach((element) => {
        if (element.classList.contains("is-expanded")) {
          element.classList.remove("is-expanded");
        }
      });

      slideMenu.forEach((element) => {
        if (element.classList.contains("open")) {
          element.classList.remove("open");
          element.style.display = "none";
        }
      });
    }

    slideClick();
  }

  function slideRight(): void {
    const menuNav = document.querySelector<HTMLElement>(".main-menu");
    const mainContainer1 = document.querySelector<HTMLElement>(".main-sidebar");

    if (menuNav && mainContainer1) {
      const marginLeftValue = Math.ceil(
        Number(window.getComputedStyle(menuNav).marginInlineStart.split("px")[0])
      );
      const marginRightValue = Math.ceil(
        Number(window.getComputedStyle(menuNav).marginInlineEnd.split("px")[0])
      );
      const check = menuNav.scrollWidth - mainContainer1.offsetWidth;
      let mainContainer1Width = mainContainer1.offsetWidth;

      if (menuNav.scrollWidth > mainContainer1.offsetWidth) {
        if (!(local_varaiable.dataverticalstyle.dir === "rtl")) {
          if (Math.abs(check) > Math.abs(marginLeftValue)) {
            menuNav.style.marginInlineEnd = "0";

            if (!(Math.abs(check) > Math.abs(marginLeftValue) + mainContainer1Width)) {
              mainContainer1Width = Math.abs(check) - Math.abs(marginLeftValue);
              const slideRightButton = document.querySelector<HTMLElement>("#slide-right");
              if (slideRightButton) {
                slideRightButton.classList.add("hidden");
              }
            }

            menuNav.style.marginInlineStart =
              (Number(menuNav.style.marginInlineStart.split("px")[0]) -
                Math.abs(mainContainer1Width)) +
              "px";

            const slideRightButton = document.querySelector<HTMLElement>("#slide-right");
            if (slideRightButton) {
              slideRightButton.classList.remove("hidden");
            }
          }
        } else {
          if (Math.abs(check) > Math.abs(marginRightValue)) {
            menuNav.style.marginInlineEnd = "0";

            if (!(Math.abs(check) > Math.abs(marginRightValue) + mainContainer1Width)) {
              mainContainer1Width = Math.abs(check) - Math.abs(marginRightValue);
              const slideRightButton = document.querySelector<HTMLElement>("#slide-right");
              if (slideRightButton) {
                slideRightButton.classList.add("hidden");
              }
            }

            menuNav.style.marginInlineStart =
              (Number(menuNav.style.marginInlineStart.split("px")[0]) -
                Math.abs(mainContainer1Width)) +
              "px";

            const slideLeftButton = document.querySelector<HTMLElement>("#slide-left");
            if (slideLeftButton) {
              slideLeftButton.classList.remove("hidden");
            }
          }
        }
      }

      const element = document.querySelector<HTMLElement>(".main-menu > .slide.open");
      const element1 = document.querySelector<HTMLElement>(".main-menu > .slide.open > ul");
      if (element) {
        element.classList.remove("active");
      }
      if (element1) {
        element1.style.display = "none";
      }
    }

    switcherArrowFn();
  }

  function slideLeft(): void {
    const menuNav = document.querySelector<HTMLElement>(".main-menu");
    const mainContainer1 = document.querySelector<HTMLElement>(".main-sidebar");

    if (menuNav && mainContainer1) {
      const marginLeftValue = Math.ceil(
        Number(window.getComputedStyle(menuNav).marginInlineStart.split("px")[0])
      );
      const marginRightValue = Math.ceil(
        Number(window.getComputedStyle(menuNav).marginInlineEnd.split("px")[0])
      );
      const check = menuNav.scrollWidth - mainContainer1.offsetWidth;
      let mainContainer1Width = mainContainer1.offsetWidth;

      if (menuNav.scrollWidth > mainContainer1.offsetWidth) {
        if (!(local_varaiable.dataverticalstyle.dir === "rtl")) {
          if (Math.abs(check) <= Math.abs(marginLeftValue)) {
            menuNav.style.marginInlineStart = "0px";
          }
        } else {
          if (Math.abs(check) > Math.abs(marginRightValue)) {
            menuNav.style.marginInlineStart = "0";

            if (!(Math.abs(check) > Math.abs(marginRightValue) + mainContainer1Width)) {
              mainContainer1Width = Math.abs(check) - Math.abs(marginRightValue);
              const slideRightButton = document.querySelector<HTMLElement>("#slide-right");
              if (slideRightButton) {
                slideRightButton.classList.add("hidden");
              }
            }

            menuNav.style.marginInlineStart =
              (Number(menuNav.style.marginInlineStart.split("px")[0]) -
                Math.abs(mainContainer1Width)) +
              "px";

            const slideLeftButton = document.querySelector<HTMLElement>("#slide-left");
            if (slideLeftButton) {
              slideLeftButton.classList.remove("hidden");
            }
          }
        }
      }

      const element = document.querySelector<HTMLElement>(".main-menu > .slide.open");
      const element1 = document.querySelector<HTMLElement>(".main-menu > .slide.open > ul");
      if (element) {
        element.classList.remove("active");
      }
      if (element1) {
        element1.style.display = "none";
      }
    }

    switcherArrowFn();
  }

  const Topup = () => {
    if (window.scrollY > 30 && document.querySelector(".app-sidebar")) {
      const Scolls = document.querySelectorAll(".app-sidebar");
      Scolls.forEach((e) => {
        e.classList.add("sticky-pin");
      });
    } else {
      const Scolls = document.querySelectorAll(".app-sidebar");
      Scolls.forEach((e) => {
        e.classList.remove("sticky-pin");
      });
    }
  };

  window.addEventListener("scroll", Topup);

  const level = 0
  let hasParent = false
  let hasParentLevel = 0

  function setSubmenu(event: any, targetObject: Menuitemtype, MENUITEMS = menuitems) {
    const theme = store.getState();
    if ((window.screen.availWidth <= 992 || theme.datanavlayout != "icon-hover") && (window.screen.availWidth <= 992 || theme.datanavlayout != "menu-hover")) {
      if (!event?.ctrlKey) {
        for (const item of MENUITEMS) {
          if (item === targetObject) {
            item.active = true;
            item.selected = true;
            // setMenuAncestorsActive(MENUITEMS,item);
            setMenuAncestorsActive(item);
          } else if (!item.active && !item.selected) {
            item.active = false; // Set active to false for items not matching the target
            item.selected = false; // Set active to false for items not matching the target
          } else {
            // removeActiveOtherMenus(MENUITEMS,item);
            removeActiveOtherMenus(item);
          }
          if (item.children && item.children.length > 0) {
            setSubmenu(event, targetObject, item.children);
          }
        }

      }
    }

    setMenuitems((arr: Menuitemtype[]) => [...arr]);
  }

  function getParentObject(obj: any, childObject: any) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object' && JSON.stringify(obj[key]) === JSON.stringify(childObject)) {
          return obj; // Return the parent object
        }
        if (typeof obj[key] === 'object') {
          const parentObject: any = getParentObject(obj[key], childObject);
          if (parentObject !== null) {
            return parentObject;
          }
        }
      }
    }
    return null; // Object not found
  }

  function setMenuAncestorsActive(targetObject: any) {
    const parent = getParentObject(menuitems, targetObject);
    const theme = store.getState();
    if (parent) {
      if (hasParentLevel > 2) {
        hasParent = true;
      }
      parent.active = true;
      parent.selected = true;
      hasParentLevel += 1;
      setMenuAncestorsActive(parent);
    }
    else if (!hasParent) {
      if (theme.dataverticalstyle == 'doublemenu') {
        ThemeChanger({ ...theme, toggled: "double-menu-close" });
      }
    }
  }

  function removeActiveOtherMenus(item: any) {
    if (item) {
      if (Array.isArray(item)) {
        for (const val of item) {
          val.active = false;
          val.selected = false;
        }
      }
      item.active = false;
      item.selected = false;

      if (item.children && item.children.length > 0) {
        removeActiveOtherMenus(item.children);
      }
    }
    else {
      return;
    }
  }
  //
  function setMenuUsingUrl(currentPath: any) {

    hasParent = false;
    hasParentLevel = 1;

    // Check current url and trigger the setSidemenu method to active the menu.

    const setSubmenuRecursively = (items: any) => {
      items?.forEach((item: any) => {
        if (item.path === `${import.meta.env.BASE_URL}dashboard/dashboard/`) {
          // Handle the default case where the path is empty (default path)
          setSubmenu(null, item);
        } else if (item.path === currentPath) {
          setSubmenu(null, item);
        }
        setSubmenuRecursively(item.children);
      });
    };
    setSubmenuRecursively(menuitems);
  }
  const [previousUrl, setPreviousUrl] = useState('/')

  useEffect(() => {

    // Select the target element
    const targetElement = document.documentElement;

    // Create a MutationObserver instance
    const observer = new MutationObserver(handleAttributeChange);

    // Configure the observer to watch for attribute changes
    const config = { attributes: true };

    // Start observing the target element
    observer.observe(targetElement, config);
    let currentPath = location.pathname.endsWith("/") ? location.pathname.slice(0, -1) : location.pathname;

    if (currentPath !== previousUrl) {
      setMenuUsingUrl(currentPath);
      setPreviousUrl(currentPath)
    }

    // ... the rest of your useEffect code
  }, [location, menuitems]);


  function toggleSidemenu(event: any, targetObject: Menuitemtype, MENUITEMS = menuitems) {
    const theme = store.getState();
    let element = event.target;

    //for icon-text
    if (theme.dataverticalstyle == 'icontext' || theme.toggled == 'icon-text-close') {
      ThemeChanger({ ...theme, icontext: "open" });
    }

    if ((theme.datanavstyle != "icon-hover" && theme.datanavstyle != "menu-hover") || (window.innerWidth < 992) || (theme.datanavlayout != "horizontal")) {
      for (const item of MENUITEMS) {
        if (item === targetObject) {
          if (theme.dataverticalstyle == 'doublemenu' && item.active) { return }
          item.active = !item.active;

          if (item.active) {
            closeOtherMenus(MENUITEMS, item);
          } else {
            if (theme.dataverticalstyle == 'doublemenu') {
              ThemeChanger({ ...theme, toggled: "double-menu-close" });
            }
          }
          setAncestorsActive(MENUITEMS, item);

        }
        else if (!item.active) {
          if (theme.dataverticalstyle != 'doublemenu') {
            item.active = false; // Set active to false for items not matching the target
          }
        }
        if (item.children && item.children.length > 0) {
          toggleSidemenu(event, targetObject, item.children);
        }
      }
      if (targetObject?.children && targetObject.active) {
        if (theme.dataverticalstyle == 'doublemenu' && theme.toggled != 'double-menu-open') {
          ThemeChanger({ ...theme, toggled: "double-menu-open" });
        }
      }
      const isHorizontalLayout = theme.datanavlayout === 'horizontal';
      const isMenuClickOrIconClick = theme.datanavlayout === 'menu-click' || theme.datanavlayout === 'icon-click';

      if (element && isHorizontalLayout && isMenuClickOrIconClick) {
        const listItem = element.closest("li");
        if (listItem) {
          // Find the first sibling <ul> element
          const siblingUL = listItem.querySelector("ul");
          let outterUlWidth = 0;
          let listItemUL = listItem.closest('ul:not(.main-menu)');
          while (listItemUL) {
            listItemUL = listItemUL.parentElement.closest('ul:not(.main-menu)');
            if (listItemUL) {
              outterUlWidth += listItemUL.clientWidth;
            }
          }
          if (siblingUL) {
            // You've found the sibling <ul> element
            let siblingULRect = listItem.getBoundingClientRect();
            if (theme.dir == 'rtl') {
              if ((siblingULRect.left - siblingULRect.width - outterUlWidth + 150 < 0 && outterUlWidth < window.innerWidth) && (outterUlWidth + siblingULRect.width + siblingULRect.width < window.innerWidth)) {
                targetObject.dirchange = true;
              } else {
                targetObject.dirchange = false;
              }
            } else {
              if ((outterUlWidth + siblingULRect.right + siblingULRect.width + 50 > window.innerWidth && siblingULRect.right >= 0) && (outterUlWidth + siblingULRect.width + siblingULRect.width < window.innerWidth)) {
                targetObject.dirchange = true;
              } else {
                targetObject.dirchange = false;
              }
            }
          }
          setTimeout(() => {
            let computedValue = siblingUL.getBoundingClientRect();
            if ((computedValue.bottom) > window.innerHeight) {
              siblingUL.style.height = (window.innerHeight - computedValue.top - 8) + 'px';
              siblingUL.style.overflow = 'auto';
            }
          }, 100);
        }
      }
    }
    setMenuitems((arr: Menuitemtype[]) => [...arr]);
  }

  function setAncestorsActive(MENUITEMS: Menuitemtype[], targetObject: Menuitemtype) {
    const theme = store.getState();
    const parent = findParent(MENUITEMS, targetObject);
    if (parent) {
      parent.active = true;
      if (parent.active) {
        ThemeChanger({ ...theme, toggled: "double-menu-close" });
      }

      setAncestorsActive(MENUITEMS, parent);
    } else {
      if (theme.dataverticalstyle == "doublemenu") {
        ThemeChanger({ ...theme, toggled: "double-menu-close" });
      }

    }
  }


  function closeOtherMenus(MENUITEMS: Menuitemtype[], targetObject: Menuitemtype) {
    for (const item of MENUITEMS) {
      if (item !== targetObject) {
        item.active = false;
        if (item.children && item.children.length > 0) {
          closeOtherMenus(item.children, targetObject);
        }
      }
    }
  }

  function findParent(MENUITEMS: Menuitemtype[], targetObject: Menuitemtype) {
    for (const item of MENUITEMS) {
      if (item.children && item.children.includes(targetObject)) {
        return item;
      }
      if (item.children && item.children.length > 0) {
        const parent: any = findParent(MENUITEMS = item.children, targetObject);
        if (parent) {
          return parent;
        }
      }
    }
    return null;
  }

  const Sideclick = () => {
    if (window.innerWidth > 992) {
      let html = document.documentElement;
      if (html.getAttribute('icon-overlay') != 'open') {
        html.setAttribute('icon-overlay', 'open');
      }

    }
  }

  function handleAttributeChange(mutationsList: any) {
    for (const mutation of mutationsList) {
      if (mutation.type === 'attributes' && (mutation.attributeName === 'data-nav-layout' || mutation.attributeName === 'data-vertical-style')) {
        const newValue = mutation.target.getAttribute('data-nav-layout');
        if (newValue == 'vertical') {
          let currentPath = location.pathname.endsWith('/') ? location.pathname.slice(0, -1) : location.pathname;
          currentPath = !currentPath ? `${import.meta.env.BASE_URL}dashboard/dashboard/` : currentPath;
          setMenuUsingUrl(currentPath);
        } else {
          closeMenuFn();
        }
      }
    }
  }
  return (
    <Fragment>
       <div id="responsive-overlay" onClick={() => menuClose()}></div>
      <aside className="app-sidebar sticky" id="sidebar" onMouseEnter={() => Onhover()} onMouseLeave={() => Outhover()}>


        <div className="main-sidebar-header">
          <Link to={`${import.meta.env.BASE_URL}dashboard/dashboard/`} className="header-logo">
            <img src={imagesData('desktoplogo')} alt="logo" className="desktop-logo" />
            <img src={imagesData('togglelogo')} alt="logo" className="toggle-logo" />
            <img src={imagesData('desktopdark')} alt="logo" className="desktop-dark" />
            <img src={imagesData('toggledark')} alt="logo" className="toggle-dark" />
            <img src={imagesData('desktopwhite')} alt="logo" className="desktop-white" />
            <img src={imagesData('togglewhite')} alt="logo" className="toggle-white" />
          </Link>
        </div>

        <SimpleBar className="main-sidebar" id="sidebar-scroll">

          <nav className="main-menu-container nav nav-pills flex-column sub-open">
            <div className="slide-left" id="slide-left" onClick={() => { slideLeft(); }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191" width="24" height="24" viewBox="0 0 24 24"> <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path> </svg>
            </div>

            <ul className="main-menu" onClick={() => Sideclick()}>
              {menuitems.map((levelone) => (
                <Fragment key={Math.random()}>
                  <li className={`${levelone.menutitle ? 'slide__category' : ''} 
									                ${levelone.type === 'link' ? 'slide' : ''}
                                  ${levelone.type === 'sub' ? 'slide has-sub' : ''} 
												        	${levelone?.active ? 'open' : ''} 
												        	${levelone?.selected ? 'active' : ''}`}>{levelone.menutitle ? <span className='category-name'>{levelone.menutitle}</span> : ""}
                    {/* if Link */}
                    {levelone.type === "link" ?
                      <Link to={levelone.path + "/"} className={`side-menu__item ${levelone.selected ? 'active' : ''}`}>

                        {/* In case of doublemenu style the icon contains tooltip here is the style for single menu items */}

                        {/* Note: for doublemenu style if contains tooltip kindly refer Menuloop.tsx for more info. refer line no. 20 in Menuloop.tsx component */}

                        {localStorage.nowalayout === 'horizontal' ? (
                          // If nowalayout is 'horizontal', do not show tooltip
                          levelone.icon
                        ) : (
                          localStorage.nowaverticalstyles === 'doublemenu' ? (
                            // If nowaverticalstyles is 'doublemenu', show tooltip
                            <div className="custom-tooltip">
                              <OverlayTrigger placement={localStorage.nowartl ? 'left' : 'right'} overlay={<Tooltip>{levelone.title}</Tooltip>}>{levelone.icon}</OverlayTrigger>
                            </div>
                          ) : (
                            // If nowalayout is not 'horizontal' and nowaverticalstyles is not 'doublemenu', show levelone.icon
                            levelone.icon
                          )
                        )}

                        <span className="side-menu__label">{levelone.title}</span> </Link>
                      : ""}

                    {/* if empty  */}
                    {levelone.type === "empty" ?
                      <Link to="#" className='side-menu__item'>{levelone.icon}<span className="">{levelone.title}</span></Link>
                      : ""}

                    {/* if Sub level  */}
                    {levelone.type === "sub" ? <Menuloop MENUITEMS={levelone} level={level + 1} toggleSidemenu={toggleSidemenu} /> : ''}
                  </li>
                </Fragment>
              ))}
            </ul>
            <div className="slide-right" id="slide-right" onClick={() => { slideRight(); }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191" width="24" height="24" viewBox="0 0 24 24"> <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
            </div>
          </nav>


        </SimpleBar>

      </aside>
    </Fragment>
  );
};

const mapStateToProps = (state: actiontype) => ({
  local_varaiable: state
});

export default connect(mapStateToProps, { ThemeChanger })(Sidebar);