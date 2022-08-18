import {Button, Col, Form, Input, InputNumber, Modal, Row, Select} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {
    createPriceList,
    deletePriceList,
    editPriceList,
    getPriceList, setPriceList
} from "../redux/actions";
import React, {useEffect, useState} from "react";
import TextArea from "antd/es/input/TextArea";

const {Option} = Select;

export default function PriceList() {
    const [form] = Form.useForm();
    const [addGroupNameForm] = Form.useForm();
    const dispatch = useDispatch();
    const priceList = useSelector(state => state.priceList.priceList)
    const [isModalAddVisible, setIsModalAddVisible] = useState(false);
    const [isModalEditVisible, setIsModalEditVisible] = useState(false);
    const [activeTitle, setActiveTitle] = useState('')

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
    const handleChange = () => {
        form.setFieldsValue({
            details: priceList.filter(item => item.title === form.getFieldValue('title'))[0].details,
        });
        setActiveTitle(form.getFieldValue('title'))
    };

    const submitAddGroupNameForm = () => {
        addGroupNameForm.submit();
        if (typeof addGroupNameForm.getFieldValue('title') === 'string' && addGroupNameForm.getFieldValue('title').trim().length !== 0) {
            handleOk(setIsModalAddVisible)
        }
        console.log(addGroupNameForm.getFieldValue('title'))
    }

    const onFinish = (values) => {
        if ({...priceList.filter(item => item.title === form.getFieldValue('title'))[0], ...values}.id === undefined) {
            dispatch(createPriceList(values))
        } else {
            dispatch(editPriceList({...priceList.filter(item => item.title === form.getFieldValue('title'))[0], ...values}))
        }
    };
    const deletePriceListItem = () => {
        form.setFieldValue('title', '')
        setActiveTitle('')
        form.setFieldsValue({
            details: []
        })
        dispatch(deletePriceList(priceList.filter(item => item.title === activeTitle)[0]))
    }
    const createGroupName = (values) => {
        dispatch(setPriceList({
            "title": values.title,
            "details": [{}]
        }))
        setActiveTitle(values.title)
        form.setFieldsValue({
            title: values.title,
            details: [{}],
        });
    }
    return (
        <div style={{margin: "0 20%"}}>
            <Row justify={"center"}>
                <h1>Прайс-лист</h1>
            </Row>
            <Form
                form={form}
                name={"editPriceListForTitle"}
                onFinish={onFinish}
                requiredMark={false}
            >
                <Row justify={"space-between"}>
                    <Form.Item
                        name={"title"}
                        label="Група операцій"
                        rules={
                            [
                                {
                                    required: true,
                                    message: "Виберіть або створіть операцію!"
                                }
                            ]
                        }

                    >

                        <Select
                            onChange={handleChange}
                            style={{width: 300,}}
                        >
                            {
                                priceList.map(item => {
                                    return (
                                        <Option key={item.title} value={item.title}>{item.title} </Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Button
                        type="dashed"
                        icon={<PlusOutlined/>}
                        onClick={() => showModal(setIsModalAddVisible)}>
                        Додати групу
                    </Button>
                    {
                        activeTitle && <>
                            <Button
                                onClick={() => showModal(setIsModalEditVisible)}
                            >
                                Редагувати групу
                            </Button>
                            <Button
                                onClick={deletePriceListItem}
                                danger
                                type={"primary"}
                            >
                                Видалити групу
                            </Button>
                        </>
                    }
                </Row>
                <Form.List
                    name={'details'}
                >
                    {(fields, {add, remove}) => {
                        return (
                            <>
                                {
                                    activeTitle &&
                                    <Row style={{marginBottom: "20px"}} justify={"space-around"}>
                                        <Col span={10}>Операція</Col>
                                        <Col span={2}>Ціна, грн</Col>
                                        <Col span={2}></Col>
                                    </Row>
                                }
                                {fields.map((field, index) => (
                                    <Row key={field.key} justify={"space-around"}>
                                        <Col span={10}>
                                            <Form.Item
                                                name={[index, "subtitle"]}
                                                rules={
                                                    [
                                                        {
                                                            required: true,
                                                            message: 'Введіть групу!'
                                                        }
                                                    ]
                                                }
                                            >
                                                <TextArea maxLength={180} autoSize={{minRows: 2, maxRows: 2}}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={2}>
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
                                                <InputNumber/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={2}>
                                            {fields.length > 1 ? (
                                                <Button
                                                    danger
                                                    type="dashed"
                                                    className="dynamic-delete-button"
                                                    onClick={() => remove(field.name)}
                                                >
                                                    Видалити поле
                                                </Button>
                                            ) : null}
                                        </Col>
                                    </Row>
                                ))}
                                <Form.Item>
                                    <Button
                                        disabled={!form.getFieldValue('title')}
                                        type="dashed"
                                        onClick={() => add()}
                                        style={{width: "100%"}}
                                    >
                                        <PlusOutlined/> Додати поле
                                    </Button>
                                </Form.Item>
                            </>
                        );
                    }}
                </Form.List>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Зберегти
                    </Button>
                </Form.Item>
            </Form>
            <Modal
                title="Редагувати групу"
                visible={isModalEditVisible}
                onOk={() => handleOk(setIsModalEditVisible)}
                onCancel={() => handleCancel(setIsModalEditVisible)}
            >
                <Input/>
            </Modal>
            <Modal
                title="Додати групу"
                destroyOnClose={true}
                visible={isModalAddVisible}
                footer={
                    <Button
                        key={"ok"}
                        onClick={submitAddGroupNameForm}
                        type={"primary"}
                    >
                        Підтвердити
                    </Button>
                }
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
                        name="title"
                        hasFeedback
                        rules={[
                            {
                                validator: (_, value) => priceList.filter(item => item.title.toLowerCase() == value.toLowerCase()).length ? Promise.reject(new Error('Дана група вже існує!')) : Promise.resolve()

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

                        ]}
                    >
                        <Input placeholder="Введіть групу"/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}