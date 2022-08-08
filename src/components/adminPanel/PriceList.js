import {Button, Form, Input, InputNumber, Row, Select, Space} from "antd";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {getPriceList, test} from "../../redux/actions";

const areas = [
    {
        label: 'Beijing',
        value: 'Beijing',
    },
    {
        label: 'Shanghai',
        value: 'Shanghai',
    },
];


export default function PriceList() {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const handleChange = () => {
        form.setFieldsValue({
            sights: [],
        });
    };


    const onFinish = (values) => {
        dispatch(test(values));
    };
    return (
        <div>
            <Form
                form={form}
                name="addDetailsToPriceList"
                onFinish={onFinish}
                autoComplete="off"
                labelCol={{span: 2}}
                wrapperCol={{span: 4}}
            >
                <Form.Item
                    name="title"
                    label="Заголовок"
                    rules={[
                        {
                            required: true,
                            message: 'Missing title',
                        },
                    ]}
                >
                    <Select options={areas} onChange={handleChange}/>
                </Form.Item>
                <Form.List name="subtitle">
                    {(fields, {add, remove}) => (
                        <>
                            {fields.map((field) => (
                                <Row key={field.key}>
                                    <Form.Item
                                        noStyle
                                        shouldUpdate={(prevValues, curValues) =>
                                            prevValues.area !== curValues.area || prevValues.subtitle !== curValues.subtitle
                                        }
                                    >
                                        {() => (
                                            <Form.Item
                                                label="Підзагловок"
                                                labelCol={{span: 12}}
                                                wrapperCol={{span: 16}}
                                                name={[field.name, 'subtitle']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Missing subtitle',
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    disabled={!form.getFieldValue('title')}
                                                >
                                                </Input>
                                            </Form.Item>
                                        )}
                                    </Form.Item>
                                    <Form.Item
                                        label="Ціна"
                                        labelCol={{span: 12}}
                                        wrapperCol={{span: 16}}
                                        name={[field.name, 'price']}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Missing price',
                                            },
                                        ]}
                                    >
                                        <InputNumber addonAfter="грн" disabled={!form.getFieldValue('title')}/>
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(field.name)}/>
                                </Row>
                            ))}

                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                    Додати поля
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Зберегти
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}