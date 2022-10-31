import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteGroup, getFields, getGroups, getPriceList} from "../redux/actions";
import {Button, Col, Menu, Row} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import MainMenu from "./MainMenu";
import MainForm from "./MainForm";

function Main() {
    const dispatch = useDispatch();
    const groups = useSelector(state => state.priceList.groups)
    const fields = useSelector(state => state.priceList.fields)
    const [priceListIsEditing, setPriceListIsEditing] = useState(true);
    const [activeGroupId, setActiveGroupId] = useState({});
    useEffect(() => {
        dispatch(getGroups());
        dispatch(getFields());
    }, [dispatch]);
    const handleChange = (value) => {
        setActiveGroupId(parseInt(value.key))
    };
    return (
        <>
            <Row style={{margin: "0 10%", padding: "20px 0"}}>
                <Row justify={"space-between"} style={{width: "100%"}}>
                    <Title level={1}>Прайс-лист</Title>

                    <Button type={"primary"} onClick={() => {
                        setPriceListIsEditing(!priceListIsEditing)
                    }}>
                        {priceListIsEditing ? "Переглядати" : "Редагувати"}
                    </Button>
                </Row>
                <Row>
                    <Col>
                        <MainMenu groups={groups}/>

                    </Col>
                    <Col>
                        <MainForm/>
                    </Col>
                </Row>

            </Row>
        </>
    )
}

export default Main