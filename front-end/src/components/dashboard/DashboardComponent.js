import React, { Component } from 'react'
import { Card, Row, Col, message } from 'antd';
import { CardNumber } from './components/CardNumber';
import {
    BarChart, Bar, LineChart, Line, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default class DashboardComponent extends Component {
    render() {
        const numberStats = () => {
            const { urls } = this.props;
            let count = 0;
            if (urls.length > 0) {
                urls.forEach(url => {
                    if (url.fromClientList.length > 0) {
                        url.fromClientList.forEach(from => {
                            count++;
                        })
                    }
                })
            }
            return count;
        }

        const numbersMobile = () => {
            const { urls } = this.props;

            let count = 0;
            if (urls.length > 0) {
                urls.forEach(url => {
                    if (url.fromClientList.length > 0) {
                        url.fromClientList.forEach(from => {
                            if (from.platformCPU == 'iPhone') {
                                count++;
                            }
                            if (from.platformCPU == 'Android') {
                                count++;
                            }
                        })
                    }
                })
            }
            return count;
        }

        // const visitWithBrowser = () => {
        //     const { urls } = this.props;

        //     const arrayData = [];

        //     const browser = ['Chrome-73.0.3683.103', 'Mozilla', 'Firefox', 'Opera', 'Safari'];

        //     // let count = 0;

        //     browser.forEach(e => {
        //         // let count = 0;
        //         if (urls.length > 0) {
        //             if (urls[1].fromClientList.length > 0) {
        //                 urls[1].fromClientList.forEach(data => {
        //                     if (e === data.browserClient) {
        //                         count++;
        //                     }
        //                     if (count > 0)
        //                         arrayData.push({ x: e, y: count })
        //                 })
        //             }
        //         }
        //         return arrayData;
        //     })
        // }

        // const cards = [
        //     { icon: 'cloud', 'title': `URL's`, color: 'rgb(180, 255, 1)', number: parseInt(`${this.props.urls.length > 0 ? this.props.urls.length : 0}`) },
        //     { icon: 'user', title: 'Users', number: parseInt(`${this.props.users.length > 0 ? this.props.users.length : 0}`) },
        //     { icon: 'bar-chart', 'title': 'Stats', number: parseInt(`${numberStats() == 0 ? 0 : numberStats()}`) },
        //     { icon: 'mobile', 'title': 'Used Mobile', number: parseInt(`${numbersMobile() == 0 ? 0 : numbersMobile()}`) }
        // ];

        const cards = [{}, {}, {}, {}];

        // const data = [
        //     {
        //         name: 'Opera', numVisit: 5,
        //     },
        //     {
        //         name: 'Chrome', numVisit: 6,
        //     },
        //     {
        //         name: 'Mozilla', numVisit: 10,
        //     },
        //     {
        //         name: ''
        //     }
        // ];

        let cardN = cards.map((item, index) => (
            <Col key={index} lg={6} md={12}>
                <CardNumber {...item} />
            </Col>
        ));

        return (
            <Row gutter={24}>
                {cardN}
            </Row>
        )
    }
}
