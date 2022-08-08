import {Button, Form, Input, Row} from "antd";
import {Link} from "react-router-dom";


export default function SignUp() {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log(values)
    };
    return (
        <div>
            <Row justify={"center"}>
                <h1>Реєстрація</h1>
            </Row>
            <Form
                form={form}
                name="signUp"
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
                <Form.Item
                    label="Підтвердіть пароль"
                    name="confirm"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Будь ласка введіть ваш пароль!',
                        },
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Два паролі, які ви ввели, не збігаються!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password/>
                </Form.Item>
                <Row justify={"center"}>
                    <Button type="primary" htmlType="submit">
                        Надіслати
                    </Button>
                </Row>
                <Row justify={"center"}>
                    <Link to={'/admin/signIn'}>Вхід</Link>
                </Row>
            </Form>
        </div>
    )
}
