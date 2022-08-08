import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function Admin() {

    let navigate = useNavigate();
    useEffect(() => {
        if (window.location.pathname === '/admin') {
            navigate(`signIn`)
        }
    })

    return (
        <div>
            <Outlet />
        </div>
    );
}
