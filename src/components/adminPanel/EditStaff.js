import {Button, Checkbox, Form, Input, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {editStaff, setEmployeeInEditing} from "../../redux/actions";
import {useEffect} from "react";

export default function EditStaff() {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const employeeInEditing = useSelector(state => state.staff.employeeInEditing)
    const onFinish = (values) => {
        dispatch(editStaff({...employeeInEditing, ...values}))
        dispatch(setEmployeeInEditing({...employeeInEditing, ...values}))
    };
    const normFile = (e) => {
        return e?.fileList;
    };
    useEffect(() => {
        form.resetFields()
    })
    return (
        <div>
            <Form
                form={form}
                initialValues={employeeInEditing}
                name="editStaff"
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