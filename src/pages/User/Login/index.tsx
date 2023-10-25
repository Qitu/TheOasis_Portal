// import { Footer } from '@/components';
import { login } from '@/services/ant-design-pro/api';
// import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import {
  AlipayCircleOutlined,
  LockOutlined,
  // MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  // ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { FormattedMessage, Helmet, SelectLang, history, useIntl, useModel } from '@umijs/max';
import { Alert, Tabs, message } from 'antd';
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

  const fetchUserInfo = async () => {
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
    try {
      // 登录
      const msg = await login({ ...values, type });

      if (msg.status === 'ok') {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'xxx',
          defaultMessage: 'Login Successful!',
        });
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        // if the current url have "redirect"
        const urlParams = new URL(window.location.href).searchParams;
        // admin or user
        history.push(urlParams.get('redirect') || '/');
        return;
      }
      console.log(msg);
      // 如果失败去设置用户错误信息
      setUserLoginState(msg);
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'xxx',
        defaultMessage: 'Login failed, please try again!',
      });
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
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
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.png" />}
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
            await handleSubmit(values as API.LoginParams);
          }}
          submitter={{ searchConfig: { submitText: 'Login' } }}
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
                  defaultMessage: 'Login via Username and Password',
                }),
              },
              // {
              //   key: 'mobile',
              //   label: intl.formatMessage({
              //     id: 'xxx',
              //     defaultMessage: 'Login via NUS Email',
              //   }),
              // },
            ]}
          />

          {status === 'error' && loginType === 'account' && (
            <LoginMessage
              content={intl.formatMessage({
                id: 'x',
                defaultMessage: 'Incorrect username or password',
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
                  defaultMessage: 'Please enter your username',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage id="x" defaultMessage="Please enter your username!" />
                    ),
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

          {/*{status === 'error' && loginType === 'mobile' && <LoginMessage content="Email Verification Code Error!" />}*/}
          {/*{type === 'mobile' && (*/}
          {/*  <>*/}
          {/*    <ProFormText*/}
          {/*      fieldProps={{*/}
          {/*        size: 'large',*/}
          {/*        prefix: <UserOutlined />,*/}
          {/*      }}*/}
          {/*      name="mobile"*/}
          {/*      addonAfter="@u.nus.edu"*/}
          {/*      placeholder={intl.formatMessage({*/}
          {/*        id: 'xxx',*/}
          {/*        defaultMessage: 'NUS Email Address',*/}
          {/*      })}*/}
          {/*      rules={[*/}
          {/*        {*/}
          {/*          required: true,*/}
          {/*          message: (*/}
          {/*            <FormattedMessage*/}
          {/*              id="xxx"*/}
          {/*              defaultMessage="Please input your NUS email address!"*/}
          {/*            />*/}
          {/*          ),*/}
          {/*        },*/}
          {/*        // {*/}
          {/*        //   pattern: /^1\d{10}$/,*/}
          {/*        //   message: (*/}
          {/*        //     <FormattedMessage*/}
          {/*        //       id="pages.login.phoneNumber.invalid"*/}
          {/*        //       defaultMessage="手机号格式错误！"*/}
          {/*        //     />*/}
          {/*        //   ),*/}
          {/*        // },*/}
          {/*      ]}*/}
          {/*    />*/}
          {/*    <ProFormCaptcha*/}
          {/*      fieldProps={{*/}
          {/*        size: 'large',*/}
          {/*        prefix: <LockOutlined />,*/}
          {/*      }}*/}
          {/*      captchaProps={{*/}
          {/*        size: 'large',*/}
          {/*      }}*/}
          {/*      placeholder={intl.formatMessage({*/}
          {/*        id: 'xxx',*/}
          {/*        defaultMessage: 'Please enter the verification code!',*/}
          {/*      })}*/}
          {/*      captchaTextRender={(timing, count) => {*/}
          {/*        if (timing) {*/}
          {/*          return `${count} ${intl.formatMessage({*/}
          {/*            id: 'xxx',*/}
          {/*            defaultMessage: 'Get a verification code',*/}
          {/*          })}`;*/}
          {/*        }*/}
          {/*        return intl.formatMessage({*/}
          {/*          id: 'xxx',*/}
          {/*          defaultMessage: 'Get a verification code',*/}
          {/*        });*/}
          {/*      }}*/}
          {/*      name="captcha"*/}
          {/*      rules={[*/}
          {/*        {*/}
          {/*          required: true,*/}
          {/*          message: (*/}
          {/*            <FormattedMessage*/}
          {/*              id="xxx"*/}
          {/*              defaultMessage="Please enter the verification code!"*/}
          {/*            />*/}
          {/*          ),*/}
          {/*        },*/}
          {/*      ]}*/}
          {/*      onGetCaptcha={async (phone) => {*/}
          {/*        const result = await getFakeCaptcha({*/}
          {/*          phone,*/}
          {/*        });*/}
          {/*        if (!result) {*/}
          {/*          return;*/}
          {/*        }*/}
          {/*        message.success('Successfully get the verification code!');*/}
          {/*      }}*/}
          {/*    />*/}
          {/*  </>*/}
          {/*)}*/}
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
