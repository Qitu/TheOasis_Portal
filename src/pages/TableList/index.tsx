import { addRule, removeRule, rule, updateRule } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.RuleListItem) => {
  const hide = message.loading('Adding...');
  try {
    await addRule({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.RuleListItem[]) => {
  const hide = message.loading('Removing...');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: <FormattedMessage id="xxx" defaultMessage="ID" />,
      dataIndex: 'name',
      tip: 'The ID is the unique key',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: <FormattedMessage id="xxx" defaultMessage="Name" />,
      dataIndex: 'id',
      ellipsis: true,
      width: 80,
    },
    {
      title: <FormattedMessage id="x" defaultMessage="Description" />,
      dataIndex: 'desc',
      valueType: 'textarea',
      ellipsis: true,
      width: 80,
    },
    {
      title: <FormattedMessage id="x" defaultMessage="Background" />,
      dataIndex: 'callNo',
      // sorter: true,
      // hideInForm: true,
      // renderText: (val: string) =>
      //   `${val}${intl.formatMessage({
      //     id: 'x',
      //     defaultMessage: ' 万 ',
      //   })}`,
    },
    {
      title: <FormattedMessage id="x" defaultMessage="Status" />,
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: <FormattedMessage id="x" defaultMessage="Shut down" />,
          status: 'Default',
        },
        1: {
          text: <FormattedMessage id="x" defaultMessage="Running" />,
          status: 'Processing',
        },
        2: {
          text: <FormattedMessage id="x" defaultMessage="Online" />,
          status: 'Success',
        },
        3: {
          text: <FormattedMessage id="x" defaultMessage="Abnormal" />,
          status: 'Error',
        },
      },
    },
    {
      title: <FormattedMessage id="x" defaultMessage="Motivation" />,
      // sorter: true,
      dataIndex: 'updatedAt',
      // valueType: 'dateTime',
      // renderFormItem: (item, { defaultRender, ...rest }, form) => {
      //   const status = form.getFieldValue('status');
      //   if (`${status}` === '0') {
      //     return false;
      //   }
      //   if (`${status}` === '3') {
      //     return (
      //       <Input
      //         {...rest}
      //         placeholder={intl.formatMessage({
      //         placeholder={intl.formatMessage({
      //           id: 'pages.searchTable.exception',
      //           defaultMessage: 'Please enter the reason for the exception!',
      //         })}
      //       />
      //     );
      //   }
      //   return defaultRender(item);
      // },
    },
    {
      title: <FormattedMessage id="x" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="x" defaultMessage="Configuration" />
        </a>,
        <a key="subscribeAlert">
          <FormattedMessage id="x" defaultMessage="Activate" />
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'x',
          defaultMessage: 'Enquiry form',
        })}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
          searchText: 'Search',
          resetText: 'Reset',
          collapseRender: () => false,
          collapsed: false,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="x" defaultMessage="New" />
          </Button>,
        ]}
        request={rule}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="x" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="x" defaultMessage="item(s)" />
              &nbsp;&nbsp;
              {/*<span>*/}
              {/*  <FormattedMessage*/}
              {/*    id="pages.searchTable.totalServiceCalls"*/}
              {/*    defaultMessage="Total number of service calls"*/}
              {/*  />{' '}*/}
              {/*  {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)}{' '}*/}
              {/*  <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />*/}
              {/*</span>*/}
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
            danger
            type="primary"
          >
            <FormattedMessage id="x" defaultMessage="Batch deletion" />
          </Button>
        </FooterToolbar>
      )}
      <ModalForm
        title={intl.formatMessage({
          id: 'x',
          defaultMessage: 'Add a new metahuman character',
        })}
        width="400px"
        submitter={{
          searchConfig: {
            submitText: 'Submit',
            resetText: 'Cancel',
          },
        }}
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.RuleListItem);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: <FormattedMessage id="x" defaultMessage="Metahuman name is required!" />,
            },
          ]}
          width="md"
          name="name"
          placeholder="Please input metahuman name"
        />
        <ProFormTextArea width="md" name="desc" placeholder="Please input metahuman description" />
      </ModalForm>
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalOpen={updateModalOpen}
        values={currentRow || {}}
      />

      {/* The right pop-up */}
      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
