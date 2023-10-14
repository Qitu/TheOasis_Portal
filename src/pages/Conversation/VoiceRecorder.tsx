import React, { useEffect, useState } from "react";
import { Button, Spin, Space, Drawer } from 'antd';
import { RedoOutlined } from '@ant-design/icons';

interface VoiceRecorderProps {
    recording: boolean
    openRecord: boolean
    resultText: string 
    recordEnable: Function
    setOpenRecordg: Function
}


function VoiceRecorder(props: VoiceRecorderProps) {
    return <Drawer
            closable={true}
            maskClosable={false}
            open={props.openRecord}
            height={200}
            placement={'bottom'}
            onClose={() => {props.setOpenRecordg(false)}}
            extra={
                <Space>
                    {
                        props.resultText != '' ?
                            <Button type="primary" disabled={props.recording}>Send</Button>
                        : ""
                    }
                    <Button icon={<RedoOutlined />} disabled={props.recording} onClick={ () => props.recordEnable() }></Button>
                </Space>
            }
        >
            {
                props.recording 
                ?
                    <div>
                        <Spin style={{'width': '100%', marginTop: '10px'}} />
                        <div style={{textAlign: 'center', marginTop: '13px'}} >Recording...</div>
                    </div>
                :
                <div style={{textAlign: 'center', marginTop: '20px'}}>
                    { props.resultText }
                </div>
            }
        </Drawer>
}

export default VoiceRecorder;