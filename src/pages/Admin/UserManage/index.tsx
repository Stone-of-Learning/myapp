import { searchUsers } from '@/services/ant-design-pro/api';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useRef } from 'react';
import { Image } from 'antd';

const columns: ProColumns<API.CurrentUser>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    // 标题名
    title: '用户名',
    // 数据库返回的数据
    dataIndex: 'username',
    // 是否可以复制
    copyable: true,
    // 是否可以缩略
    ellipsis: true,
    // 提示
    tip: '标题过长会自动收缩',
  },
  {
    // 标题名
    title: '用户账户',
    // 数据库返回的数据
    dataIndex: 'userAccount',
    // 是否可以复制
    copyable: true,
  },
  {
    // 标题名
    title: '头像',
    // 数据库返回的数据
    dataIndex: 'avatarUrl',
    render: (_, record: API.CurrentUser) => (
      <div>
        <Image src={record.avatarUrl} width={100} />
      </div>
    ),
    // 是否可以复制
    copyable: true,
  },
  {
    // 标题名
    title: '性别',
    // 数据库返回的数据
    dataIndex: 'gender',
  },
  {
    // 标题名
    title: '电话',
    // 数据库返回的数据
    dataIndex: 'phone',
    // 是否可以复制
    copyable: true,
  },
  {
    // 标题名
    title: '邮件',
    // 数据库返回的数据
    dataIndex: 'email',
    // 是否可以复制
    copyable: true,
  },
  {
    // 标题名
    title: '状态',
    // 数据库返回的数据
    dataIndex: 'userStates',
  },
  {
    // 标题名
    title: '角色',
    // 数据库返回的数据
    dataIndex: 'userRole',
    valueType: 'select',
    valueEnum: {
      0: { text: '普通用户', status: 'default' },
      1: {
        text: '管理员',
        status: 'success',
      },
    },
  },
  {
    // 标题名
    title: '创建时间',
    // 数据库返回的数据
    dataIndex: 'createTime',
    valueType: 'dateTime',
  },{
    // 标题名
    title: '星球编号',
    // 数据库返回的数据
    dataIndex: 'planetCode',
  },

  // {
  //   disable: true,
  //   title: '标签',
  //   dataIndex: 'labels',
  //   search: false,
  //   renderFormItem: (_, { defaultRender }) => {
  //     return defaultRender(_);
  //   },
  //   render: (_, record) => (
  //     <Space>
  //       {record.labels.map(({ name, color }) => (
  //         <Tag color={color} key={name}>
  //           {name}
  //         </Tag>
  //       ))}
  //     </Space>
  //   ),
  // },
  // {
  //   title: '创建时间',
  //   key: 'showTime',
  //   dataIndex: 'created_at',
  //   valueType: 'dateTime',
  //   sorter: true,
  //   hideInSearch: true,
  // },
  // {
  //   title: '创建时间',
  //   dataIndex: 'created_at',
  //   valueType: 'dateRange',
  //   hideInTable: true,
  //   search: {
  //     transform: (value) => {
  //       return {
  //         startTime: value[0],
  //         endTime: value[1],
  //       };
  //     },
  //   },
  // },
  // {
  //   title: '操作',
  //   valueType: 'option',
  //   key: 'option',
  //   render: (text, record, _, action) => [
  //     <a
  //       key="editable"
  //       onClick={() => {
  //         action?.startEditable?.(record.id);
  //       }}
  //     >
  //       编辑
  //     </a>,
  //     <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
  //       查看
  //     </a>,
  //     <TableDropdown
  //       key="actionGroup"
  //       onSelect={() => action?.reload()}
  //       menus={[
  //         { key: 'copy', name: '复制' },
  //         { key: 'delete', name: '删除' },
  //       ]}
  //     />,
  //   ],
  // },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<API.CurrentUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        console.log(sort, filter);
        const userList = await searchUsers();
        return {
          data: userList,
        };
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="高级表格"
    />
  );
};
