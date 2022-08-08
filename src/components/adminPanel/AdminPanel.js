import {Layout, Menu} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import {Link, Outlet} from "react-router-dom";

export default function AdminPanel() {
    return (
        <div>
            <Layout className="layout" style={{backgroundColor: "white"}}>
                <Header>
                    <div className="logo"/>
                    <Menu mode="horizontal" theme={"dark"} defaultSelectedKeys={['main']} defaultOpenKeys={['main']}>
                        <Menu.Item key="main">
                            <Link to={'messages'}>Головна</Link>
                        </Menu.Item>
                        <Menu.SubMenu key="staff" title="Персонал">
                            <Menu.Item key="showStaff">
                                <Link to={'staff'}>Переглянути персонал</Link>
                            </Menu.Item>
                            <Menu.Item key="addStaff">
                                <Link to={'addStaff'}>Додати персонал</Link>
                            </Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="gallery" title="Галерея">
                            <Menu.Item key="showGallery">
                                <Link to={'gallery'}>Переглянути галерею</Link>
                            </Menu.Item>
                            <Menu.Item key="addInGallery">
                                <Link to={'addInGallery'}>Додати в галерею</Link>
                            </Menu.Item>
                        </Menu.SubMenu>
                        <Menu.Item key="reviews">
                            <Link to={'reviews'}>Відгуки</Link>
                        </Menu.Item>
                        <Menu.Item key='priceList'>
                            <Link to={'priceList'}>Прайс-лист</Link>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content style={{margin: "2% 20%"}}>
                    <Outlet/>
                </Content>
            </Layout>
        </div>
    )
}