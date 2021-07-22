import React from 'react';
import { NavLink } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { useHistory } from 'react-router-dom';

import './Footer.css';
import builtByLambda from '../../assets/LambdaAssets/Built by lambda.png';

const Footer = () => {
  const { push } = useHistory();

  const { authState } = useOktaAuth();

  const logout = () => {
    localStorage.removeItem('okta-token-storage', 'okta-cache-storage');
    push('/');
    window.location.reload();
  };

  return (
    <div className="footer-container">
      <div className="top-container">
        <div className="office-contact">
          <h3>New York · Washington · Los Angeles</h3>
          <p>Human Rights First, 75 Broad St, 31st Floor, New York, NY 10004</p>
          <p>For Media Inquiries call 202-370-3323</p>
          <p>
            Human Rights First is a nonpartisan, 501(c)(3), international human
            rights organization based in New York and Washington, DC. We do not
            favor or oppose any candidate for public office.
          </p>
        </div>
        <div className="built-by-lambda-container">
          <a href="https://www.humanrightsfirst.org">
            <img
              src="https://www.humanrightsfirst.org/sites/all/themes/hrf/images/hrf-footer-logo.png"
              alt="HRF footer logo"
            />
          </a>
          <a href="https://lambdaschool.com/" target="_blank" rel="noreferrer">
            <img
              className="built-by-lambda"
              src={builtByLambda}
              alt="built by lambda logo"
            />
          </a>
        </div>
        <div className="footer-links-container">
          <div className="left-links">
            <h3 className="blue-title">Blue Witness</h3>
            <a
              href="https://www.humanrightsfirst.org"
              target="_blank"
              alt="Human Rights First"
              rel="noreferrer"
            >
              Human Rights First
            </a>
            <br />
            <a
              href="https://www.humanrightsfirst.org"
              target="_blank"
              rel="noreferrer"
              alt="Twitter Bot"
            >
              Twitter Bot
            </a>
            <br />
            <NavLink
              to="/admin-dashboard"
              target="_blank"
              activeClassName="active-nav-link"
            >
              Admin Dashboard
            </NavLink>
            {authState.isAuthenticated && (
              <div className="logout" onClick={logout}>
                <NavLink to="/" activeClassName="active-nav-link">
                  Log out
                </NavLink>
              </div>
            )}
            <br />
          </div>
          <div className="right-links">
            <h3 className="red-title">Lambda</h3>
            <a
              href="https://lambdaschool.com/"
              target="_blank"
              alt="Lambda School"
              rel="noreferrer"
            >
              Lambda School
            </a>
          </div>
        </div>
      </div>
      <div className="copyright-container">
        <p>Human Rights First &copy;2021</p>
      </div>
    </div>
  );
};

export default Footer;
