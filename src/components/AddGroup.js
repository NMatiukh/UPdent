import React from 'react';
import {Button, Form, Input, Row} from "antd";
import {setPriceList} from "../redux/actions";
import {useDispatch} from "react-redux";

const AddGroup = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const onFinish = (values) => {
        dispatch(setPriceList({
            "title": form.getFieldValue('title'),
            "details": [{}]
        }))
    };
    return (
        <div>
            <Form
                form={form}
                name={"createGroupName"}
                onFinish={onFinish}
                requiredMark={false}
            >
                <Form.Item
                    name="title"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input placeholder="Введіть групу"></Input>
                </Form.Item>
                <Form.Item>
                    <Row justify="end">
                        <Button type="primary" htmlType="submit">Підтвердити</Button>
                    </Row>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddGroup;