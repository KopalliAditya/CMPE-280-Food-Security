import './logo.css';

const Header = () => {
    return (
            <div className="row header">
                <div className="col-md-4 header-elements">
                    <img src="https://www.ciheam.org/wp-content/uploads/2020/04/content_wheat-grains-on-a-bowl__1_.png" width="80" height="50" />
                </div>
                <div className="col-md-8 header-elements">
                    <span>Food Security And Data Sensors Dashboard</span>
                </div>
            </div>
    )
}

export default Header;