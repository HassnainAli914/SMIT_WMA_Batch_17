function Navbar() {

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary z-index-1050" style={{position:'sticky', top:'0px', zIndex:'1050', border:'1px solid'}}>
                <div className="container-fluid">
                    <a className="navbar-brand" style={{color:'#ff4757', fontWeight:'bold'}} href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#/posts">Posts</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#/about">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#/contact">Contact</a>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{ margin:'5px'}} />
                            <button className="btn btn-outline-success" type="submit" style={{ margin:'5px'}}>Search</button>
                            <button className="btn btn-outline-success active" style={{backgroundColor:'#ff4757', margin:'5px'}} type="submit">                                
                                <a className="nav-link active" href="#/auth">Login</a>
                                </button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Navbar;
