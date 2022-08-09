import {Button, Form, Input, InputNumber, Row, Select, Space} from "antd";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {getPriceList, putPriceList} from "../../redux/actions";
import {useEffect, useState} from "react";
import TextArea from "antd/es/input/TextArea";

const {Option} = Select;

export default function PriceList() {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const priceList = useSelector(state => state.priceList.priceList)
    useEffect(() => {
        dispatch(getPriceList())
    }, [dispatch])

    const onFinish = (values) => {
        dispatch(putPriceList({...priceList.filter(item => item.title === form.getFieldValue('title'))[0], ...values}))
    };
    const handleChange = () => {
        form.setFieldsValue({
            details: priceList.filter(item => item.title === form.getFieldValue('title'))[0].details,
        });
    };
    return (
        <div>
            <Form
                form={form}
                name={"editPriceListForTitle"}
                onFinish={onFinish}
                initialValues={priceList}
            >
                <Form.Item
                    name={"title"}
                    label="Заголовок"
                    wrapperCol={{span: 4}}
                >
                    <Select onChange={handleChange}>
                        {
                            priceList.map(item => {
                                return (
                                    <Option key={item.title} value={item.title}>{item.title}</Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
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
                                            rules={[{required: true}]}
                                            style={{width: "50%"}}
                                        >
                                            <TextArea/>
                                        </Form.Item>
                                        <Form.Item
                                            label="Ціна"
                                            name={[index, "price"]}
                                            rules={[{required: true}]}
                                        >
                                            <InputNumber/>
                                        </Form.Item>
                                        {fields.length > 1 ? (
                                            <Button
                                                type="danger"
                                                shape={"round"}
                                                className="dynamic-delete-button"
                                                onClick={() => remove(field.name)}
                                                // icon={<MinusCircleOutlined />}
                                            >
                                                Remove
                                            </Button>
                                        ) : null}
                                    </Row>
                                ))}
                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        style={{width: "100%"}}
                                    >
                                        <PlusOutlined/> Add field
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