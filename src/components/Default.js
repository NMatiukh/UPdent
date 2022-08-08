import {Button} from "antd";
import {Link} from "react-router-dom";

export default function Default(){
    return(
        <div>
            <Button>
                <Link to={'admin'}>Admin</Link>
            </Button>
        </div>
    )
}