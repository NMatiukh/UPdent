import {Button, Checkbox, Form, Input, Row, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {createStaff} from "../../redux/actions";

export default function AddStaff() {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const onFinish = (values) => {
        dispatch(createStaff(values))
        form.resetFields();
    };
    const normFile = (e) => {
        return e?.fileList;
    };
    return (
        <div>
            <Row justify={"center"}>
                <h1>Додати працівника</h1>
            </Row>
            <Form
                form={form}
                name="addStaff"
                onFinish={onFinish}
                labelCol={{span: 8}}
                wrapperCol={{span: 8}}
            >
                <Form.Item
                    name="firstName"
                    label="Ім’я"
                    rules={[
                        {
                            required: true,
                            message: 'Будь ласка введіть ваше ім’я!'
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="secondName"
                    label="Прізвище"
                    rules={[
                        {
                            required: true,
                            message: 'Будь ласка введіть ваше прізвище!'
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="position"
                    label="Посада"
                    rules={[
                        {
                            required: true,
                            message: 'Будь ласка введіть вашу посаду!'
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="details"
                    wrapperCol={{offset: 8}}
                    rules={[
                        {
                            required: true,
                            message: 'Будь ласка виберіть відділення!'
                        }
                    ]}
                >
                    <Checkbox.Group>
                        <Checkbox
                            value="Головна сторінка"
                        >
                            Головна сторінка
                        </Checkbox>
                        <Checkbox
                            value="Дитяча стоматологія"
                        >
                            Дитяча стоматологія
                        </Checkbox>
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item
                    name="upload"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    wrapperCol={{offset: 8, span: 8}}
                >
                    <Upload
                        name="photo"
                        accept="image/png, image/jpeg"
                        listType="picture"
                        maxCount
                    >
                        <Button icon={<UploadOutlined/>}>Натисніть щоб завантажити</Button>
                    </Upload>
                </Form.Item>
                <Form.Item wrapperCol={{offset: 8, span: 8}}>
                    <Button type="primary" htmlType="submit">
                        Створити
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}