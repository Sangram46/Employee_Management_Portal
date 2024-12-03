// import React from 'react';
// import { Link } from 'react-router-dom';

// function NavbarTask() {
//     return (
//         <nav style={{background:"#007FFF",height:"50px"}}>
//             <h2>Employee Dashboard</h2>
//             <ul style={{marginLeft:"1155px"}}>
//                 <li><Link to="/signin"><button style={{color:"white",borderRadius:"5px",border:"white",background:"#E32636",marginLeft:"60px"}}>Logout</button></Link></li>
//                 {/* <li><Link to="/signup"><button style={{color:"blue",borderRadius:"5px",border:"white"}}>Sign Up</button></Link></li> */}
//             </ul>
//         </nav>
//     );
// }

// export default NavbarTask;

import React from 'react';
import { Link } from 'react-router-dom';

function NavbarTask() {
    const navStyle = {
        background: "#007FFF",
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        color: "white",
        fontWeight:"bold"
        
    };

    const ulStyle = {
        listStyle: "none",
        margin: 0,
        padding: 0,
        display: "flex",
        alignItems: "center",
    };

    const buttonStyle = {
        color: "white",
        borderRadius: "5px",
        border: "none",
        background: "#E32636",
        padding: "5px 10px",
        cursor: "pointer",
    };

    return (
        <nav style={navStyle}>
            <h2 style={{ margin: 0 }}>Employee Dashboard</h2>
            <ul style={ulStyle}>
                <li>
                    <Link to="/signin">
                        <button style={buttonStyle}>Logout</button>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavbarTask;
