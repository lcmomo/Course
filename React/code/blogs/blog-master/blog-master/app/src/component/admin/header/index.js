import React, { Component } from 'react';
import { Layout } from 'antd';
import UserHead from './userHead';
import styles from 'index.scss';
const { Header: AntdHeader } = Layout;

class Header extends Component {
    render() {
        return (
            <AntdHeader className={styles.headerContainer}>
                <UserHead></UserHead>
            </AntdHeader>
        )
    }
}

export default Header