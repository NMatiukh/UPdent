import {Button, Checkbox, Form, Input, Row, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {createPhoto} from "../../redux/actions";
import TextArea from "antd/es/input/TextArea";

export default function AddInGallery() {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const onFinish = (values) => {
        dispatch(createPhoto(values))
        form.resetFields();
    };
    const normFile = (e) => {
        return e?.fileList;
    };
    return (
        <div>
            <Row justify={"center"}>
                <h1>Додати в галерею</h1>
            </Row>
            <Form
                form={form}
                name="logIn"
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
                        action={'https://fake-server-app-nmatiukh.herokuapp.com/posts'}
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