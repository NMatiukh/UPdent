import {Button, Checkbox, Form, Input, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {editPhoto, setEmployeeInEditing} from "../../redux/actions";
import {useEffect} from "react";
import TextArea from "antd/es/input/TextArea";

export default function EditGallery() {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const employeeInEditing = useSelector(state => state.staff.employeeInEditing)
    const onFinish = (values) => {
        dispatch(editPhoto({...employeeInEditing, ...values}))
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
                name="editGallery"
                initialValues={employeeInEditing}
                onFinish={onFinish}
                labelCol={{span: 8}}
                wrapperCol={{span: 8}}
            >
                <Form.Item
                    name="title"
                    label="Заголовок"
                    rules={[
                        {
                            required: true,
                            message: 'Будь ласка введіть заголовок!'
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Короткий опис"
                    rules={[
                        {
                            required: true,
                            message: 'Будь ласка введіть опис!'
                        }
                    ]}
                >
                    <TextArea showCount maxLength={200} autoSize={{minRows: 6, maxRows: 10}}/>
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
                    rules={[
                        {
                            required: true,
                            message: 'Будь ласка завантажте фото!'
                        }
                    ]}
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