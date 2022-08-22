import {Button, Col, Form, Input, InputNumber, Modal, Row, Select} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {
    changePriceListTitle,
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
    const [editGroupNameForm] = Form.useForm();
    const dispatch = useDispatch();
    const priceList = useSelector(state => state.priceList.priceList)
    const [isModalAddVisible, setIsModalAddVisible] = useState(false);
    const [isModalEditVisible, setIsModalEditVisible] = useState(false);
    const [activeTitle, setActiveTitle] = useState('')

    const validators = [
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
    const handleChange = () => {
        form.setFieldsValue({
            details: priceList.filter(item => item.title === form.getFieldValue('title'))[0].details,
        });
        setActiveTitle(form.getFieldValue('title'))
    };

    const submitGroupNameForm = (form, setIsModalVisible) => {
        form.validateFields(['title'])
            .then(() => {
                form.submit();
                handleOk(setIsModalVisible)
            })
            .catch(status => {
                console.error(status)
            })
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
    const editGroupName = (values) => {
        dispatch(changePriceListTitle({...priceList.filter(item => item.title === form.getFieldValue('title'))[0], ...values}))
        setActiveTitle(values.title)
        form.setFieldsValue({
            title: values.title
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
                destroyOnClose={true}
                footer={
                    <Button
                        key={"editOk"}
                        onClick={() => submitGroupNameForm(editGroupNameForm, setIsModalEditVisible)}
                        type={"primary"}
                    >
                        Редагувати
                    </Button>
                }
                onOk={() => submitGroupNameForm(editGroupNameForm, setIsModalEditVisible)}
                onCancel={() => handleCancel(setIsModalEditVisible)}
            >
                <Form
                    form={editGroupNameForm}
                    name={"editGroupName"}
                    requiredMark={false}
                    preserve={false}
                    onFinish={editGroupName}
                >
                    <Form.Item
                        name="title"
                        hasFeedback
                        initialValue={activeTitle}
                        rules={validators}
                    >
                        <Input placeholder="Введіть групу"/>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Додати групу"
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
                        name="title"
                        hasFeedback
                        rules={validators}
                    >
                        <Input placeholder="Введіть групу"/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}