import {Button, Image, List, Modal, Row} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {deletePhoto, getPhotos, setEmployeeInEditing} from "../../redux/actions";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import EditStaff from "./EditStaff";
import EditGallery from "./EditGallery";

const {confirm} = Modal;

export default function Gallery() {
    const dispatch = useDispatch();
    const photos = useSelector(state => state.gallery.photos);
    const [isModalVisible, setIsModalVisible] = useState(false);
    let i = 1;
    useEffect(() => {
        dispatch(getPhotos())
    }, [dispatch])
    const showPromiseConfirm = (item) => {
        confirm({
            title: `Ви хочете видалити фото?`,
            icon: <ExclamationCircleOutlined/>,
            okType: 'danger',
            okText: 'Так',
            cancelText: 'Ні',
            onOk() {
                dispatch(deletePhoto(item))
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
                <h1>Галерея</h1>
            </Row>
            <List
                itemLayout="vertical"
                dataSource={photos}
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
                            description={item.description}
                        />
                        {
                            item.upload ?
                                <Image
                                    width={100}
                                    src={item.upload[0].thumbUrl}
                                /> :
                                null
                        }
                        <p>{item.title}</p>
                    </List.Item>
                )}
            />
            <Modal
                title="Редагувати фото"
                visible={isModalVisible}
                onOk={handleOk}
                centered
                width={1000}
                footer={null}
                onCancel={handleCancel}
            >
                <EditGallery/>
            </Modal>
        </div>
    )
}