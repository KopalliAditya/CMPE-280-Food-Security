import Header from "./header";
import NavBar from "./nav";
import '../App.css';

const Imports = () => {
    return (
        <div>
             <div className="row">
                <Header/>
            </div>
            <div className='row'>
                <div className='col-md-3' style={{"background-color":"#333"}}><NavBar/></div>
                <div className="col-md-1 vl"></div>
                
                <div className='col-md-8 main-container'>
                    <div className="row ">
                        <div className="col-md-9"></div>
                            <div className="col-md-3">
                                <select >
                                    <option>USA</option>
                                    <option>CHINA</option>
                                    <option>INDIA</option>
                                </select>
                            </div>
                        </div>
                    <div className="row">
                        <div className="col-md-6">
                            <select>
                                <option>2015</option>
                                <option>2016</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <button>Wheat</button>
                            <button>Rice</button>
                            <button>Corn</button>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-md-7">sankey</div>
                        <div className="col-md-5">pie</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Imports;