import {Button, Form, Input, Row} from "antd";
import {Link} from "react-router-dom";


export default function SignIn() {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log(values)
    };
    return (
        <div>
            <Row justify={"center"}>
                <h1>Вхід</h1>
            </Row>
            <Form
                form={form}
                name="logIn"
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
                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Будь ласка введіть ваш пароль!'
                        }
                    ]}
                    hasFeedback
                >
                    <Input.Password/>
                </Form.Item>
                <Row justify={"center"}>
                    <Button type="primary" htmlType="submit">
                        Вхід
                    </Button>
                </Row>
                <Row justify={"center"}>
                    <Link to={'/admin/signUp'}>Реєстарція</Link>
                </Row>
                <Row justify={"center"}>
                    <Link to={'/admin/forgotPassword'}>Забули пароль?</Link>
                </Row>
            </Form>
        </div>
    )
}
