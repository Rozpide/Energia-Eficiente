import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import JourNaviLogo from "../../img/JOURNAVI.png";
import NoPicture from "../../img/No Picture.png";


export const Navbar = () => {
	const { store, actions } = useContext(Context);

	const handleLogout = () => {
		actions.logout();
	}

	return (
		<nav className="navbar navbar-light"  style={{background: '#FE5558'}}>
			<div className="container">
				<Link to="/" style={{ textDecoration: 'none' }}>
					<div className="d-flex clearfix">
						<img className="mx-auto d-block" src={JourNaviLogo} alt="" width="30" height="30" />
						<span className="navbar-brand mb-0 ms-2 h1">JourNavi</span>
					</div>
				</Link>
				<div className="ml-auto">
					{!store.isLogged ? 
						<Link to="/login">
							<button className="btn btn-dark">Login</button>
						</Link>
					:
					<div className="btn-group">
						<button type="button" className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
							<img src={store.user.picture ? store.user.picture : NoPicture} className="me-3" style={{ width: '30px', borderRadius: '100%' }} alt="Profile Picture" />
							{store.user.name ? store.user.name : store.user.email}
						</button>
						<ul className="dropdown-menu dropdown-menu-dark w-100 text-center">
							<Link to="/profile" style={{ textDecoration: 'none' }}>
								<li><span className="dropdown-item">Profile</span></li>
							</Link>
							<Link to="/settings" style={{ textDecoration: 'none' }}>
								<li><span className="dropdown-item">Settings</span></li>
							</Link>
							<li><span className="dropdown-item" style={{ cursor: 'pointer' }} onClick={handleLogout}>Logout</span></li>
						</ul>
					</div>
					}
				</div>
			</div>
		</nav>
	);
};