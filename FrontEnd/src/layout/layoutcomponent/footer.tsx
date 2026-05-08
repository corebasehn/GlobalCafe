import { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';

interface ComponentProps { }

const Footer: FC<ComponentProps> = () => {
  return (
    <Fragment>
      <footer className="footer mt-auto py-3 bg-white text-center">
        <div className="container">
          <span> Copyright © <span id="year">{new Date().getFullYear()}</span> <Link
            to="#" className="text-primary">CoreBase</Link>.
          </span>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;