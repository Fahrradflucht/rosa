import React, { PropTypes } from 'react';
import Sidenav from './sidenav';

const Shell = ({toggled, children, onNavbarTogglerClick}) => (
    <div id="shell-wrapper" className={ toggled ? 'toggled' : '' }>
        <Sidenav />
        <button className="navbar-toggler" type="button" onClick={onNavbarTogglerClick}>
            &#9776;
        </button>
        <div id="shell-content-wrapper">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        { children }
                    </div>
                </div>
            </div>
        </div>
    </div>
);


Shell.propTypes = {
    onNavbarTogglerClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    toggled: PropTypes.bool.isRequired
};

export default Shell;