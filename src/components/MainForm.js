import React from 'react';
import {useForm} from "antd/es/form/Form";
import {Form} from "antd/es";
import Button from "antd/es/button";

const MainForm = () => {
    const [form] = useForm();

    const onFormFinish = (values) => {
        console.log(values)
    };

    const onFormFinishFailed = (errorInfo) => {
        console.log(errorInfo)
    };

    const onFormClearClick = () => {
      form.resetFields();
    };

    return (
        <>
            <Form
                form={form}
                name="basic"
                layout="horizontal"
                initialValues={{remember: true}}
                onFinish={onFormFinish}
                onFinishFailed={onFormFinishFailed}
            >
                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={onFormClearClick}>
                        Clear
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default MainForm;