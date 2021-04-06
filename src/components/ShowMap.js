import React, { useContext, useEffect, useState } from 'react'
import { Table, Row, Col } from 'antd';
import { FormCategory } from './FormCategory';


export const ShowMap = ({ showSelect}) => {

    return (
        <Row className="tablaCategorias">

            <Col span={6} >
                
                <FormCategory showSelect={showSelect} />
            </Col>

            <Col span={18}>
                <div id='map'  style={{ height: "85vh" }}> 
                </div>

            </Col>

        </Row>
    );
}
