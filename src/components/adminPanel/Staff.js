import {Button, Image, List, Modal, Row} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {deleteStaff, getStaff, setEmployeeInEditing} from "../../redux/actions";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import EditStaff from "./EditStaff";

const {confirm} = Modal;

export default function Staff() {
    const dispatch = useDispatch();
    const staff = useSelector(state => state.staff.staff);
    const [isModalVisible, setIsModalVisible] = useState(false);
    let i = 1;
    useEffect(() => {
        dispatch(getStaff())
    }, [dispatch])
    const showPromiseConfirm = (item) => {
        confirm({
            title: `Ви хочете видалити працівника?`,
            icon: <ExclamationCircleOutlined/>,
            okType: 'danger',
            okText: 'Так',
            cancelText: 'Ні',
            onOk() {
                dispatch(deleteStaff(item))
            },
            onCancel() {
            },
        });
    }
    const showModal = (item) => {
        dispatch(setEmployeeInEditing(item))
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        dispatch(setEmployeeInEditing(undefined))
        setIsModalVisible(false);
    };

    return (
        <div>
            <Row justify={"center"}>
                <h1>Персонал</h1>
            </Row>
            <List
                itemLayout="vertical"
                dataSource={staff}
                renderItem={item => (
                    <List.Item
                        key={item.id}
                        actions={
                            [
                                <Button
                                    shape={"round"}
                                    type={"default"}
                                    onClick={() => showModal(item)}
                                >
                                    Редагувати
                                </Button>,
                                <Button
                                    shape={"round"}
                                    onClick={() => showPromiseConfirm(item)}
                                    danger
                                    type={"default"}
                                >
                                    Видалити
                                </Button>
                            ]
                        }
                    >
                        <List.Item.Meta
                            title={i++ + ". " + (item.details.length === 1 ? item.details[0] : item.details[0] + " | " + item.details[1])}
                        />
                        {
                            item.upload[0] ?
                                <Image
                                    width={100}
                                    src={item.upload[0].thumbUrl}
                                /> :
                                null
                        }
                        <p>{item.firstName + " " + item.secondName}</p>
                        <p>{item.position}</p>
                    </List.Item>
                )}
            />
            <Modal
                title="Редагувати працівника"
                visible={isModalVisible}
                onOk={handleOk}
                centered
                width={1000}
                footer={null}
                onCancel={handleCancel}
            >
                <EditStaff/>
            </Modal>
        </div>
    )
}