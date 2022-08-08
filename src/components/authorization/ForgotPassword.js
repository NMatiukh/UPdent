import {Button, Form, Input, Row} from "antd";
import {Link} from "react-router-dom";

export default function ForgotPassword() {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log(values)
    };
    return (
        <div>
            <Row justify={"center"}>
                <h1>Забули пароль?</h1>
            </Row>
            <Form
                form={form}
                name="forgotPassword"
                onFinish={onFinish}
                labelCol={{span: 8}}
                wrapperCol={{span: 8}}
            >
                <Form.Item
                    name="email"
                    label="Email"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Будь ласка введіть ваш E-mail!',
                        },
                        {
                            type: "email",
                            message: 'E-mail не є валідним!'
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Row justify={"center"}>
                    <Button type="primary" htmlType="submit">
                        Надішліть мені інструкції щодо зміни пароля
                    </Button>
                </Row>
                <Row justify={"center"}>
                    <Link to={'/admin/signIn'}>Вхід</Link>
                </Row>
                <Row justify={"center"}>
                    <Link to={'/admin/signUp'}>Реєстрація</Link>
                </Row>
            </Form>
        </div>
    )
}