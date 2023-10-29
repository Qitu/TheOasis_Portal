// import { Footer } from '@/components';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  AlipayCircleOutlined,
  LockOutlined,
  // MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Helmet, history, useModel } from '@umijs/max';
import { Alert, Tabs, message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import Settings from '../../../../config/defaultSettings';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ActionIcons = () => {
  const langClassName = useEmotionCss(({ token }) => {
    return {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    };
  });

  return (
    <>
      <AlipayCircleOutlined key="AlipayCircleOutlined" className={langClassName} />
      <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={langClassName} />
      <WeiboCircleOutlined key="WeiboCircleOutlined" className={langClassName} />
    </>
  );
};


const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Login: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');

  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });

  const fetchUserInfo = async () => {
    // Get user details
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    // new login method
    const msg_token = await axios.post(
      '/auth/login',
      { mobile: values.username, password: values.password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log(msg_token)
    if (msg_token.data.code === 200) {
      // user verification
      const user_token = msg_token.data.object;
      const msg_user = await axios.post(
        '/auth/verify',
        { token: user_token },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (msg_user.status === 200) {
        message.success('Login Successful!');

        // get user details
        const user_obj = msg_user.data;

        const userInfo = {
          uid: user_obj.uid,
          name: user_obj.nickname,
          access: user_obj.identity,
          avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        };

        localStorage.setItem('currentUser', JSON.stringify(userInfo));
        localStorage.setItem('userToken', user_token);

        if (userInfo) {
          flushSync(() => {
            setInitialState((s) => ({
              ...s,
              currentUser: userInfo,
            }));
          });
        }

        // if the current url have "redirect"
        const urlParams = new URL(window.location.href).searchParams;
        // admin or user
        if (user_obj.identity === 'admin') {
          history.push(urlParams.get('redirect') || '/admin');
        } else {
          history.push(urlParams.get('redirect') || '/');
        }
        return;
      }
    } else {
      message.error('Login failed, please try again!');
    }
  };

  const handleRegister = async (values: Record<string, any>) => {
    const msg = await axios.post(
      '/auth/register',
      { mobile: values.mobile, nickname: values.username_set, password: values.password_set },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (msg.data.code === 200) {
      message.success("Registration successful!");
    } else {
      message.error("Registration failed")
    }

  };

  const { status, type: loginType } = userLoginState;

  return (
    <div className={containerClassName}>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 380,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo2.png" />}
          title="Oasis"
          subTitle=""
          initialValues={{
            autoLogin: true,
          }}
          // actions={[
          //   <FormattedMessage
          //     key="loginWith"
          //     id="xxx"
          //     defaultMessage="Other Login Methods"
          //   />,
          //   <ActionIcons key="icons" />,
          // ]}

          onFinish={async (values) => {
            if (type === 'account') {
              // 当活动标签是 'account' 时调用登录函数
              await handleSubmit(values as API.LoginParams);
            } else if (type === 'mobile') {
              // 当活动标签是 'mobile' 时调用注册函数
              await handleRegister(values);
            }
          }}
          submitter={{
            searchConfig: {
              submitText: type === 'account' ? 'Login' : 'Register', // 根据活动标签动态设置按钮文本
            },
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: 'Login',
              },
            ]}
          />

          {status === 'error' && loginType === 'account' && (
            <LoginMessage
              content={'Incorrect username or password'}
            />
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'Please enter your username'}
                rules={[
                  {
                    required: true,
                    message: "Please enter your username!",
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'Please enter your password'}
                rules={[
                  {
                    required: true,
                    message: "Please enter your password!",
                  },
                ]}
              />
            </>
          )}

          {status === 'error' && loginType === 'mobile' && (
            <LoginMessage content="Email Verification Code Error!" />
          )}
          {type === 'mobile' && (
            <>
              {/* set uid */}
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                name="mobile"
                placeholder={'Please enter your phone number as the uid'}
                rules={[
                  {
                    required: true,
                    message: ("Please enter your phone number as the uid!"),
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: ("The phone number format is incorrect!"),
                  },
                ]}
              />

              {/* set username */}
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                name="username_set"
                placeholder={'Please set your username'}
                rules={[
                  {
                    required: true,
                    message: ("Please set your username!"),
                  },
                ]}
              />

              {/* set password */}
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'Please set your password'}
                name="password_set"
                rules={[
                  {
                    required: true,
                    message: ("Please set your password!"),
                  },
                ]}
              />
            </>
          )}

          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">Remember username</ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              Forgotten Password?
            </a>
          </div>
        </LoginForm>
      </div>
    </div>
  );
};

export default Login;
