import {Button, Modal, Col, List, Row, Typography} from "antd";
import {useEffect, useState} from "react";
import {deleteMessage, getMessages} from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import EditMessage from "./EditMessage";

const {confirm} = Modal;

export default function Messages() {
    const dispatch = useDispatch();
    const messages = useSelector(state => state.messages.messages)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = (item) => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    useEffect(() => {
        dispatch(getMessages())
    }, [dispatch])
    const showPromiseConfirm = (item) => {
        confirm({
            title: `Ви хочете видалити повідомлення?`,
            icon: <ExclamationCircleOutlined/>,
            okType: 'danger',
            okText: 'Так',
            cancelText: 'Ні',
            onOk() {
                dispatch(deleteMessage(item))
            },
            onCancel() {
            },
        });
    }
    return (
        <div>
            <Row justify={"center"}>
                <h1>Повідомлення</h1>
            </Row>
            <List
                itemLayout="vertical"
                size="large"
                dataSource={messages}
                renderItem={item => (
                    <List.Item
                        actions={
                            [
                                <Button
                                    shape={"round"}
                                    type={"default"}
                                    onClick={() => showModal(item)}
                                >
                                    Змінити статус
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
                        key={item.id}
                    >
                        <List.Item.Meta
                            title={item.date}
                        />
                        <Row>
                            <Typography.Text type={"danger"}>
                                Нове повідомлення!
                            </Typography.Text>
                        </Row>
                        <Row gutter={50}>
                            <Col>
                                {item.details}
                            </Col>
                            <Col>
                                {item.author}
                            </Col>
                            <Col>
                                {item.phoneNumber}
                            </Col>
                        </Row>
                    </List.Item>
                )}
            />
            <Modal
                title='Змінити статус'
                visible={isModalVisible}
                footer={null}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <EditMessage/>
            </Modal>
        </div>
    )
}