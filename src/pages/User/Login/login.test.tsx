import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { TestBrowser } from '@@/testBrowser'; // 根据实际路径进行导入
import { startMock } from '@@/requestRecordMock'; // 根据实际路径进行导入

let server: {
  close: () => void;
};

describe('Login Page', () => {
  beforeAll(async () => {
    server = await startMock({
      port: 8000,
      scene: 'login',
    });
  });

  afterAll(() => {
    server?.close();
  });

  it('should show login form', async () => {
    const historyRef = React.createRef<any>();
    const rootContainer = render(
      <TestBrowser
        historyRef={historyRef}
        location={{
          pathname: '/user/login',
        }}
      />,
    );

    await rootContainer.findAllByText('Oasis');

    act(() => {
      historyRef.current?.push('/user/login');
    });

    // 进行断言，根据您的需求添加更多断言
    // expect(rootContainer.baseElement?.querySelector('.ant-pro-form-login-desc')?.textContent).toBe(
    //   'Ant Design is the most influential web design specification in Xihu district',
    // );

    expect(rootContainer.asFragment()).toMatchSnapshot();

    await rootContainer.unmount();
  });
});
