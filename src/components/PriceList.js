import {
    Button,
    Checkbox,
    Col, Empty, Form,
    Input,
    InputNumber,
    Menu,
    Modal,
    Row,
    Select, Spin, Typography
} from "antd";
import {ExclamationCircleOutlined, DeleteOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {
    createField, createGroup, deleteField, deleteGroup,
    editField, editGroup,
    getPriceList, setPriceDetails, setPriceList
} from "../redux/actions";
import React, {useEffect, useRef, useState} from "react";
import TextArea from "antd/es/input/TextArea";
import InfiniteScroll from 'react-infinite-scroll-component';
import {message} from "antd";

const {Option} = Select;
const {confirm} = Modal;
const {Title, Text} = Typography;

const mainColSpanValues = {
    "checkbox": 1,
    "operation": 12,
    "price": 2,
    "button": 6
}

export default function PriceList() {
    const [form] = Form.useForm();
    const [addGroupNameForm] = Form.useForm();
    const [transferFieldsForm] = Form.useForm();
    const dispatch = useDispatch();
    const priceList = useSelector(state => state.priceList.priceList)
    const [isModalAddVisible, setIsModalAddVisible] = useState(false);
    const [isModalTransferFieldsVisible, setIsModalTransferFieldsVisible] = useState(false);

    const [activeTitle, setActiveTitle] = useState(0)
    const [activeBox, setActiveBox] = useState(false)
    const [priceListIsEditing, setPriceListIsEditing] = useState(false);
    const [oneTransferField, setOneTransferField] = useState(0);

    const validators = [
        {
            validator: (_, value) => priceList.filter(item => item.titleUA.toLowerCase() === value.toLowerCase()).length ? Promise.reject(new Error('Дана група вже існує!')) : Promise.resolve()

        },
        {
            required: true,
            message: "Введіть групу!"
        },
        () => ({
            validator(_, value) {
                if (!value || value.trim().length !== 0) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error('Введіть групу!'))
            }
        }),

    ]

    useEffect(() => {
        dispatch(getPriceList())
    }, [dispatch])

    const showModal = (setIsModalVisible) => {
        setIsModalVisible(true);
    };
    const handleOk = (setIsModalVisible) => {
        setIsModalVisible(false);
    };
    const handleCancel = (setIsModalVisible) => {
        setIsModalVisible(false);
    };
    const handleChange = (value) => {
        let obj = priceList.filter(item => item.id === parseInt(value.key))[0];
        form.setFieldsValue({
            "titleUA": obj.titleUA,
            "titleEN": obj.titleEN,
            "titlePL": obj.titlePL,
            "priority": obj.priority,
            "details": obj.details || '',
        });
        setActiveTitle(parseInt(value.key))
    };

    const showPromiseConfirm = (someFunction, text) => {
        confirm({
            title: `Ви хочете видалити ${text}?`,
            icon: <ExclamationCircleOutlined/>,
            okType: 'danger',
            okText: 'Так',
            cancelText: 'Ні',
            centered: true,
            onOk() {
                someFunction();
            },
            onCancel() {
            },
        });
    }
    const submitGroupNameForm = (activeForm, setIsModalVisible) => {
        activeForm.validateFields(['titleUA'])
            .then(() => {
                activeForm.submit();
                handleOk(setIsModalVisible)
            })
            .catch(status => {
                console.error(status)
            })
    }

    const onFinish = (values) => {
        dispatch(editGroup(values, activeTitle))

        values.details.map((item) => {
            item.id ?
                dispatch(editField(item, activeTitle))
                :
                dispatch(createField(item, activeTitle));
        })
        message.success(`Виконано!`);
    };
    const createGroupName = (values) => {
        dispatch(createGroup(values))
    }
    const returnCheckedItems = () => {
        let detailsTrue = form.getFieldsValue().details.filter(value => value.status);
        let detailsFalse = form.getFieldsValue().details.filter(value => !value.status);
        let id;
        priceList.map(value1 => {
            value1.titleUA === transferFieldsForm.getFieldValue('title') && (id = value1.id)
        })
        detailsTrue.map(value => dispatch(editField(value, id)))
        form.setFieldsValue({
            details: detailsFalse
        })
        dispatch(getPriceList());
        message.success(`Перенесено поля!`);
    }
    const massDelete = () => {
        let detailsTrue = form.getFieldsValue().details.filter(value => value.status);
        let detailsFalse = form.getFieldsValue().details.filter(value => !value.status);
        detailsTrue.map(value => dispatch(deleteField(value, activeTitle)))
        form.setFieldsValue({
            details: detailsFalse
        })
        dispatch(getPriceList());
        message.success(`Видалено!`);
    }

    function transferField(key) {
        let id;
        priceList.map(value1 => {
            value1.titleUA === transferFieldsForm.getFieldValue('title') && (id = value1.id)
        })
        let field = form.getFieldsValue().details[(key)];
        let valueDetails = priceList.filter(value => value.id === activeTitle)
        form.setFieldsValue({
            titleUA: valueDetails[0].titleUA,
            titleEN: valueDetails[0].titleEN,
            titlePL: valueDetails[0].titlePL,
            details: valueDetails[0].details.filter(value => value.id !== valueDetails[0].details[key].id),
        });
        dispatch(editField({...field, "id": valueDetails[0].details[key].id}, id))
        dispatch(getPriceList());
        message.success(`Перенесено поле!`);
    }

    function changeActiveBox() {
        try {
            if (form.getFieldsValue().details.filter(value => value.status).length > 0) {
                setActiveBox(true)
            } else setActiveBox(false)
        } catch (e) {

        }
    }


    const dragItem = useRef(null);
    const dragOverItem = useRef(null);

    const handleSort = () => {
        let _price = [...priceList.filter(value => value.id === activeTitle)[0].details]
        const draggedItemContent = _price.splice(dragItem.current, 1)[0];
        _price.splice(dragOverItem.current, 0, draggedItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        _price = _price.map((value, index) => {
            return {...value, "priority": index}
        })
        dispatch(setPriceDetails(_price))
        form.setFieldValue(
            "details", _price);
    }


    const dragItemMenu = useRef(null);
    const dragOverItemMenu = useRef(null);

    const handleSortMenu = () => {
        let _price = [...priceList]
        const draggedItemContent = _price.splice(dragItemMenu.current, 1)[0];
        _price.splice(dragOverItemMenu.current, 0, draggedItemContent);
        dragItemMenu.current = null;
        dragOverItemMenu.current = null;
        _price = _price.map((value, index) => {
            return {...value, "priority": index}
        })
        dispatch(setPriceList(_price))
        let obj = _price.filter(item => item.id === activeTitle)[0];
        obj && form.setFieldValue(
            "priority", obj.priority);
        _price.map(value => dispatch(editGroup(value, value.id)))
    }

    return (
        <div onClick={() => {
            activeTitle && changeActiveBox()
        }} style={{margin: "0 10%", padding: "20px 0"}}>
            <Row justify={"space-between"}>
                <Title>Прайс-лист</Title>
                <Button type={"primary"} onClick={() => {
                    setPriceListIsEditing(!priceListIsEditing)
                }}>
                    {priceListIsEditing ? "Переглядати" : "Редагувати"}
                </Button>
            </Row>
            <Row justify={"space-between"}>
                <Col
                    span={4}
                >
                    <div
                        style={{
                            maxHeight: ((80 * document.documentElement.clientHeight) / 100),
                            overflow: 'auto',
                            borderBottom: "1px solid rgba(217, 217, 217, 1)",
                            margin: "20px 0"
                        }}
                    >
                        <InfiniteScroll
                            dataLength={priceList.length}
                            hasMore={false}
                            loader={<Spin/>}
                            next={() => {
                                console.log("this is the end of list")
                            }}
                        >
                            <Menu
                                mode="inline"
                                items={priceList.map((value, index) => {
                                    return {
                                        label:
                                            <Row
                                                onDragStart={(e) => dragItemMenu.current = index}
                                                onDragEnter={(e) => dragOverItemMenu.current = index}
                                                onDragEnd={handleSortMenu}
                                                onDragOver={(e) => e.preventDefault()}
                                                style={priceListIsEditing && {cursor: "move"}}
                                                draggable={priceListIsEditing} justify={"space-between"}
                                                align={"middle"}>
                                                {value.titleUA}
                                                {
                                                    priceListIsEditing && <DeleteOutlined onClick={() => {
                                                        showPromiseConfirm(() => {
                                                            dispatch(deleteGroup(value))
                                                            setActiveTitle(0)
                                                            form.setFieldsValue({
                                                                details: []
                                                            })
                                                        }, 'групу')
                                                    }}/>
                                                }
                                            </Row>,
                                        key: value.id
                                    }
                                })}
                                onClick={(item) => handleChange(item)}
                                selectable={true}
                                selectedKeys={[activeTitle.toString()]}
                            />
                        </InfiniteScroll>
                    </div>
                    <div>
                        {
                            priceListIsEditing &&
                            <Button onClick={() => showModal(setIsModalAddVisible)}>Додати групу</Button>
                        }
                    </div>
                </Col>
                <Col span={20}>
                    <Row justify={"space-between"} style={{marginLeft: "6%"}}>
                        {
                            activeTitle ?
                                <Col span={24}>

                                    <Form
                                        form={form}
                                        name={"editPriceListForTitle"}
                                        onFinish={onFinish}
                                        requiredMark={false}
                                        disabled={!priceListIsEditing}
                                        onChange={changeActiveBox}
                                    >
                                        <Row justify={"space-between"} style={{width: "70%"}}>
                                            <Col span={6}>
                                                <Form.Item
                                                    label={"ua"}
                                                    name={"titleUA"}
                                                    rules={
                                                        [
                                                            {
                                                                required: true,
                                                                message: 'Введіть операцію!'
                                                            }
                                                        ]
                                                    }
                                                >
                                                    <TextArea maxLength={71}
                                                              autoSize={{minRows: 1, maxRows: 1}}
                                                              style={{
                                                                  background: "white",
                                                                  color: "black"
                                                              }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item
                                                    label={"en"}
                                                    name={"titleEN"}
                                                >
                                                    <TextArea maxLength={71}
                                                              autoSize={{minRows: 1, maxRows: 1}}
                                                              style={{
                                                                  background: "white",
                                                                  color: "black"
                                                              }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item
                                                    label={"pl"}
                                                    name={"titlePL"}
                                                >
                                                    <TextArea maxLength={71}
                                                              autoSize={{minRows: 1, maxRows: 1}}
                                                              style={{
                                                                  background: "white",
                                                                  color: "black"
                                                              }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Form.Item
                                                name={"priority"}
                                                style={{display: "none"}}
                                            >
                                                <InputNumber/>
                                            </Form.Item>
                                        </Row>
                                        <Form.List
                                            name={'details'}
                                        >
                                            {(fields, {add, remove}) => {
                                                return (
                                                    <>
                                                        <Row style={{marginBottom: "20px"}} justify={"space-between"}>
                                                            <Col span={mainColSpanValues.checkbox}>

                                                            </Col>
                                                            <Col span={mainColSpanValues.operation}>
                                                                {
                                                                    activeTitle &&
                                                                    <Text strong>
                                                                        Операція
                                                                    </Text>
                                                                }
                                                            </Col>
                                                            <Col span={mainColSpanValues.price}>
                                                                {
                                                                    activeTitle &&
                                                                    <Text strong>
                                                                        Ціна, грн
                                                                    </Text>
                                                                }
                                                            </Col>
                                                            <Col span={mainColSpanValues.button}>

                                                            </Col>
                                                        </Row>
                                                        <div
                                                            style={{
                                                                maxHeight: ((64 * document.documentElement.clientHeight) / 100),
                                                                overflow: 'auto',
                                                                marginBottom: "20px",
                                                                borderBottom: "1px solid rgba(217, 217, 217, 1)"
                                                            }}
                                                        >
                                                            <InfiniteScroll
                                                                dataLength={fields.length}
                                                                hasMore={false}
                                                                loader={<Spin/>}
                                                                next={() => {
                                                                    console.log("this is the end of list")
                                                                }}
                                                            >
                                                                {fields.map((field, index) => (
                                                                    <Row key={field.key}
                                                                         justify={"space-between"}
                                                                         style={{marginBottom: "20px", cursor: "move"}}
                                                                         draggable={priceListIsEditing}
                                                                         onDragStart={(e) => dragItem.current = index}
                                                                         onDragEnter={(e) => dragOverItem.current = index}
                                                                         onDragEnd={handleSort}
                                                                         onDragOver={(e) => e.preventDefault()}
                                                                    >
                                                                        <Col span={mainColSpanValues.checkbox}>
                                                                            {
                                                                                priceListIsEditing &&
                                                                                <Form.Item
                                                                                    name={[index, "status"]}
                                                                                    valuePropName="checked"
                                                                                >
                                                                                    <Checkbox/>
                                                                                </Form.Item>
                                                                            }
                                                                        </Col>
                                                                        <Col span={mainColSpanValues.operation}>
                                                                            <Form.Item
                                                                                label={"ua"}
                                                                                name={[index, "subtitleUA"]}
                                                                                rules={
                                                                                    [
                                                                                        {
                                                                                            required: true,
                                                                                            message: 'Введіть операцію!'
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            >
                                                                                <TextArea maxLength={71}
                                                                                          autoSize={{
                                                                                              minRows: 1,
                                                                                              maxRows: 1
                                                                                          }}
                                                                                          style={{
                                                                                              background: "white",
                                                                                              color: "black"
                                                                                          }}
                                                                                />
                                                                            </Form.Item>
                                                                            <Form.Item
                                                                                label={"en"}
                                                                                name={[index, "subtitleEN"]}
                                                                            >
                                                                                <TextArea maxLength={71}
                                                                                          autoSize={{
                                                                                              minRows: 1,
                                                                                              maxRows: 1
                                                                                          }}
                                                                                          style={{
                                                                                              background: "white",
                                                                                              color: "black"
                                                                                          }}
                                                                                />
                                                                            </Form.Item>
                                                                            <Form.Item
                                                                                label={"pl"}
                                                                                name={[index, "subtitlePL"]}
                                                                            >
                                                                                <TextArea maxLength={71}
                                                                                          autoSize={{
                                                                                              minRows: 1,
                                                                                              maxRows: 1
                                                                                          }}
                                                                                          style={{
                                                                                              background: "white",
                                                                                              color: "black"
                                                                                          }}
                                                                                />
                                                                            </Form.Item>
                                                                        </Col>
                                                                        <Col span={mainColSpanValues.price}>
                                                                            <Form.Item
                                                                                name={[index, "price"]}
                                                                                rules={
                                                                                    [
                                                                                        {
                                                                                            required: true,
                                                                                            message: 'Введіть ціну!'
                                                                                        },
                                                                                        {
                                                                                            type: 'number',
                                                                                            min: 0,
                                                                                            message: 'Введіть ціну більшу 0!'
                                                                                        },
                                                                                    ]
                                                                                }
                                                                            >
                                                                                <InputNumber style={{
                                                                                    background: "white",
                                                                                    color: "black"
                                                                                }}/>
                                                                            </Form.Item>
                                                                        </Col>
                                                                        <Col span={mainColSpanValues.button}>
                                                                            {
                                                                                priceListIsEditing &&
                                                                                <Row justify={"space-evenly"}>
                                                                                    <Button
                                                                                        type={"dashed"}
                                                                                        onClick={() => {
                                                                                            setOneTransferField(field.name)
                                                                                            showModal(setIsModalTransferFieldsVisible)
                                                                                        }}
                                                                                    >Перенести</Button>
                                                                                    <Button
                                                                                        danger
                                                                                        type={"primary"}
                                                                                        onClick={() => showPromiseConfirm(() => {
                                                                                            console.log({
                                                                                                "from": form.getFieldsValue().details,
                                                                                                "fields": fields
                                                                                            })
                                                                                            dispatch(deleteField(form.getFieldsValue().details[field.name], activeTitle))
                                                                                            remove(field.name)
                                                                                        }, 'поле')}
                                                                                    >
                                                                                        Видалити
                                                                                    </Button>
                                                                                </Row>
                                                                            }
                                                                        </Col>
                                                                    </Row>
                                                                ))}
                                                            </InfiniteScroll>
                                                        </div>
                                                        <Form.Item>
                                                            {
                                                                priceListIsEditing &&
                                                                <>
                                                                    <Row justify={"space-between"}
                                                                         style={{width: "40%", marginBottom: '20px'}}>
                                                                        <Button
                                                                            disabled={!activeTitle}
                                                                            onClick={() => add()}
                                                                        >
                                                                            Додати поле
                                                                        </Button>
                                                                        <Button disabled={!activeBox} type={"dashed"}
                                                                                onClick={() => {
                                                                                    setOneTransferField(null)
                                                                                    showModal(setIsModalTransferFieldsVisible)
                                                                                }}>Перенести</Button>
                                                                        <Button danger
                                                                                disabled={!activeBox}
                                                                                onClick={() => showPromiseConfirm(massDelete, 'вибрані поля')}
                                                                                type={"primary"}>Видалити</Button>
                                                                    </Row>
                                                                    <Row>
                                                                        <Button
                                                                            htmlType={"submit"}
                                                                            type={"primary"}
                                                                        >Зберегти</Button>
                                                                    </Row>
                                                                </>
                                                            }
                                                        </Form.Item>
                                                    </>
                                                );
                                            }}
                                        </Form.List>
                                    </Form>
                                    <Modal
                                        title="Перенести поля"
                                        centered
                                        destroyOnClose={true}
                                        visible={isModalTransferFieldsVisible}
                                        footer={
                                            <Button
                                                key={"addOk"}
                                                onClick={() => submitGroupNameForm(transferFieldsForm, setIsModalTransferFieldsVisible)}
                                                type={"primary"}
                                            >
                                                Підтвердити
                                            </Button>
                                        }
                                        onOk={() => submitGroupNameForm(transferFieldsForm, setIsModalTransferFieldsVisible)}
                                        onCancel={() => handleCancel(setIsModalTransferFieldsVisible)}
                                    >
                                        <Form
                                            form={transferFieldsForm}
                                            name={"transferFields"}
                                            requiredMark={false}
                                            preserve={false}
                                            onFinish={() => {
                                                (oneTransferField !== null) ? transferField(oneTransferField) : returnCheckedItems()
                                            }}
                                        >
                                            <Form.Item
                                                name="title"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Виберіть групу!"
                                                    }
                                                ]}
                                            >
                                                <Select placeholder="Виберіть групу">
                                                    {
                                                        priceList.map(item => {
                                                            return item.id !== activeTitle &&
                                                                <Option
                                                                    key={item.id}
                                                                    value={item.titleUA}
                                                                >
                                                                    {item.title}
                                                                </Option>
                                                        })
                                                    }
                                                </Select>
                                            </Form.Item>
                                        </Form>
                                    </Modal>
                                </Col> :
                                <Empty style={{margin: "20%  auto"}} image={Empty.PRESENTED_IMAGE_SIMPLE}/>
                        }
                    </Row>
                </Col>
            </Row>
            <Modal
                title="Додати групу"
                centered
                destroyOnClose={true}
                visible={isModalAddVisible}
                footer={
                    <Button
                        key={"addOk"}
                        onClick={() => submitGroupNameForm(addGroupNameForm, setIsModalAddVisible)}
                        type={"primary"}
                    >
                        Підтвердити
                    </Button>
                }
                onOk={() => submitGroupNameForm(addGroupNameForm, setIsModalAddVisible)}
                onCancel={() => handleCancel(setIsModalAddVisible)}
            >
                <Form
                    form={addGroupNameForm}
                    name={"createGroupName"}
                    requiredMark={false}
                    preserve={false}
                    onFinish={createGroupName}
                >
                    <Form.Item
                        name="titleUA"
                        hasFeedback
                        rules={validators}
                    >
                        <Input placeholder="Введіть групу ua"/>
                    </Form.Item>
                    <Form.Item
                        name="titleEN"
                    >
                        <Input placeholder="Введіть групу en"/>
                    </Form.Item>
                    <Form.Item
                        name="titlePL"
                    >
                        <Input placeholder="Введіть групу pl"/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}