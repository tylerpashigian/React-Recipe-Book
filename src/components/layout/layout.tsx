import classes from './layout.module.css';

const Layout = (props: any) => {
  return (
    <div className={`container ${classes.layout}`}>
      {props.children}
    </div>
  );
};

export default Layout;
