import {Link} from "react-router-dom";
function Navbar(){
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-custom">
            <div className="container">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div id="navbarsExample07" className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">
                                Devclave <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">
                                Developers <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                    </ul>

                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/register">
                                Register <span className="sr-only">(current)</span>
                            </Link>
                            
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/login">
                                Login <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;