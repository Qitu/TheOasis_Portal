/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * if the current user is an administrator
 * */
export default function access(initialState: { currentUser?: any } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canAdmin: currentUser && currentUser.access === 'admin',
  };
}
