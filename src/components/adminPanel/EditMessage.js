import {Button, Form, Row, Select} from "antd";

export default function EditMessage() {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log(values)
    }
    const onReset = () => {
        form.resetFields();
    };

    return (
        <Form
            form={form}
            // initialValues={}
            name="editMessages"
            onFinish={onFinish}
            labelCol={{span: 8}}
            wrapperCol={{span: 8}}
        >
            <Form.Item name='status' label="Статус">
                <Select>
                    <Select.Option value="inWork">В роботі</Select.Option>
                    <Select.Option value="done">Опрацьовано</Select.Option>

                </Select>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 8, span: 8}}>
                <Row justify={"space-around"}>
                    <Button shape={"round"} type="primary" htmlType="submit">
                        Змінити
                    </Button>
                </Row>
            </Form.Item>
        </Form>
    )
}