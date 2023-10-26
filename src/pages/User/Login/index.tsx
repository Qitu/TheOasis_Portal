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
import { FormattedMessage, Helmet, SelectLang, history, useIntl, useModel } from '@umijs/max';
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

const Lang = () => {
  const langClassName = useEmotionCss(({ token }) => {
    return {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });

  return (
    <div className={langClassName} data-lang>
      {SelectLang && <SelectLang />}
    </div>
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

  const intl = useIntl();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    if (msg_token.data.message === 'SUCCESS') {
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
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'xxx',
          defaultMessage: 'Login Successful!',
        });
        message.success(defaultLoginSuccessMessage);

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
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'xxx',
        defaultMessage: 'Login failed, please try again!',
      });
      message.error(defaultLoginFailureMessage);
    }

    // old login method
    // try {
    //   // 登录
    //   const msg = await login({ ...values, type });
    //
    //   if (msg.status === 'ok') {
    //     const defaultLoginSuccessMessage = intl.formatMessage({
    //       id: 'xxx',
    //       defaultMessage: 'Login Successful!',
    //     });
    //     message.success(defaultLoginSuccessMessage);
    //     await fetchUserInfo();
    //     // if the current url have "redirect"
    //     const urlParams = new URL(window.location.href).searchParams;
    //     // admin or user
    //     history.push(urlParams.get('redirect') || '/');
    //     return;
    //   }
    //
    //   console.log(msg);
    //   // 如果失败去设置用户错误信息
    //   setUserLoginState(msg);
    // } catch (error) {
    //   const defaultLoginFailureMessage = intl.formatMessage({
    //     id: 'xxx',
    //     defaultMessage: 'Login failed, please try again!',
    //   });
    //   console.log(error);
    //   message.error(defaultLoginFailureMessage);
    // }
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
    console.log(msg);
  };

  const { status, type: loginType } = userLoginState;

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {intl.formatMessage({
            id: 'xxx',
            defaultMessage: 'Login Page ',
          })}
          - {Settings.title}
        </title>
      </Helmet>
      <Lang />
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
          logo={<img alt="logo" src="/logo.svg" />}
          title="Oasis: A MetaHuman Platform"
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
                label: intl.formatMessage({
                  id: 'x',
                  defaultMessage: 'Login via Uid and Password',
                }),
              },
              {
                key: 'mobile',
                label: intl.formatMessage({
                  id: 'xxx',
                  defaultMessage: 'Register',
                }),
              },
            ]}
          />

          {status === 'error' && loginType === 'account' && (
            <LoginMessage
              content={intl.formatMessage({
                id: 'x',
                defaultMessage: 'Incorrect uid or password',
              })}
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
                placeholder={intl.formatMessage({
                  id: 'x',
                  defaultMessage: 'Please enter your uid',
                })}
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="x" defaultMessage="Please enter your uid!" />,
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={intl.formatMessage({
                  id: 'x',
                  defaultMessage: 'Please enter your password',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage id="x" defaultMessage="Please enter your password!" />
                    ),
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
                placeholder={intl.formatMessage({
                  id: 'xxx',
                  defaultMessage: 'Please enter your phone number as the uid',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="xxx"
                        defaultMessage="Please enter your phone number as the uid!"
                      />
                    ),
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: (
                      <FormattedMessage
                        id="x"
                        defaultMessage="The phone number format is incorrect!"
                      />
                    ),
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
                placeholder={intl.formatMessage({
                  id: 'xxx',
                  defaultMessage: 'Please set your username',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage id="xxx" defaultMessage="Please set your username!" />
                    ),
                  },
                ]}
              />

              {/* set password */}
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={intl.formatMessage({
                  id: 'xxx',
                  defaultMessage: 'Please set your password',
                })}
                name="password_set"
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage id="xxx" defaultMessage="Please set your password!" />
                    ),
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
            <ProFormCheckbox noStyle name="autoLogin">
              <FormattedMessage id="xxx" defaultMessage="Auto-login" />
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              <FormattedMessage id="xxx" defaultMessage="Forgotten Password?" />
            </a>
          </div>
        </LoginForm>
      </div>
    </div>
  );
};

export default Login;
