import {Button, Divider, Form, Input, InputNumber, Row, Select, Space} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {
    changePriceListTitle,
    createPriceList,
    deletePriceList,
    editPriceList,
    getPriceList,
    setPriceList
} from "../../redux/actions";
import {useEffect, useRef, useState} from "react";
import TextArea from "antd/es/input/TextArea";

const {Option} = Select;

export default function PriceList() {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const priceList = useSelector(state => state.priceList.priceList)
    const inputRef = useRef(null);
    const [titleName, setTitleName] = useState('')
    const [activeTitle, setActiveTitle] = useState('')
    const [changeTitleActive, setChangeTitleActive] = useState(false);
    useEffect(() => {
        dispatch(getPriceList())
    }, [dispatch])
    const onTitleNameChange = (event) => {
        setTitleName(event.target.value);
    };
    const addTitle = (e) => {
        e.preventDefault();
        dispatch(setPriceList({
            "title": titleName,
            "details": [{}]
        }))
        setTitleName('');
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };
    const onFinish = (values) => {
        if ({...priceList.filter(item => item.title === form.getFieldValue('title'))[0], ...values}.id === undefined) {
            dispatch(createPriceList(values))
        } else {
            dispatch(editPriceList({...priceList.filter(item => item.title === form.getFieldValue('title'))[0], ...values}))
        }
    };
    const handleChange = () => {
        form.setFieldsValue({
            details: priceList.filter(item => item.title === form.getFieldValue('title'))[0].details,
        });
        setActiveTitle(form.getFieldValue('title'))
    };
    const deletePriceListItem = () => {
        form.setFieldValue('title', '')
        setActiveTitle('')
        form.setFieldsValue({
            details: []
        })
        if (priceList.filter(item => item.title === activeTitle)[0].id) {
            dispatch(deletePriceList(priceList.filter(item => item.title === activeTitle)[0]))
        }
    }
    const showEditActiveTitle = () => {
        setChangeTitleActive(true);
    }
    const confirmChangeActiveTitle = () => {
        setChangeTitleActive(false);
        let item = {...priceList.filter(item => item.title === activeTitle)[0]};
        item.title = form.getFieldValue('title');
        dispatch(changePriceListTitle(item))
        setActiveTitle(form.getFieldValue('title'))
    }
    return (
        <div>
            <Form
                form={form}
                name={"editPriceListForTitle"}
                onFinish={onFinish}
            >
                <Row justify={"space-between"} style={{width: "60%"}}>
                    <Form.Item
                        name={"title"}
                        label="Заголовок"
                        rules={
                            [
                                {
                                    required: true,
                                    message: "Виберіть або створіть заголовок!"
                                }
                            ]
                        }
                    >
                        {
                            changeTitleActive ?
                                <Input style={{width: 300,}}/> :
                                <Select
                                    onChange={handleChange}
                                    style={{width: 300,}}
                                    dropdownRender={(menu) => (
                                        <>
                                            {menu}
                                            <Divider
                                                style={{
                                                    margin: '8px 0',
                                                }}
                                            />
                                            <Space
                                                style={{
                                                    padding: '0 8px 4px',
                                                }}
                                            >
                                                <Input
                                                    placeholder="Введіть заголовок"
                                                    value={titleName}
                                                    onChange={onTitleNameChange}
                                                    ref={inputRef}
                                                />
                                                <Button type="dashed" icon={<PlusOutlined/>} onClick={addTitle}>
                                                    Додати
                                                </Button>
                                            </Space>
                                        </>
                                    )}
                                >
                                    {
                                        priceList.map(item => {
                                            return (
                                                <Option key={item.title} value={item.title}>{item.title} </Option>
                                            )
                                        })
                                    }
                                </Select>
                        }
                    </Form.Item>
                    {
                        activeTitle && <>
                            {
                                changeTitleActive ?
                                    <Button
                                        onClick={confirmChangeActiveTitle}
                                    >
                                        Зберегти
                                    </Button> :
                                    <Button
                                        onClick={showEditActiveTitle}
                                    >
                                        Редагувати
                                    </Button>
                            }
                            <Button
                                onClick={deletePriceListItem}
                                danger
                                type={"primary"}
                            >
                                Видалити
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
                                {fields.map((field, index) => (
                                    <Row key={field.key} justify={"space-around"}>
                                        <Form.Item
                                            name={[index, "subtitle"]}
                                            label="Підзаголовок"
                                            rules={
                                                [
                                                    {
                                                        required: true,
                                                        message: 'Введіть підзаголовок!'
                                                    }
                                                ]
                                            }
                                            style={{width: "50%"}}

                                        >
                                            <TextArea showCount maxLength={180} autoSize={{minRows: 4, maxRows: 8}}/>
                                        </Form.Item>
                                        <Form.Item
                                            label="Ціна"
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
                                            style={{width: "18%"}}
                                        >
                                            <InputNumber addonAfter={"грн"}/>
                                        </Form.Item>
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
        </div>
    )
}