// types/global.d.ts
export {};
declare global {
  interface Window {
    $dialog?: ReturnType<typeof import('naive-ui')['useDialog']>
    $loadingBar?: ReturnType<typeof import('naive-ui')['useLoadingBar']>
    $message?: ReturnType<typeof import('naive-ui')['useMessage']>
    $notification?: ReturnType<typeof import('naive-ui')['useNotification']>
  }
}