import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getFields, getGroups, getPriceList} from "../redux/actions";

function Main() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getGroups());
        dispatch(getFields());
    });
    return (
        <div>
            Main
        </div>
    )
}

export default Main