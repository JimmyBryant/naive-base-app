// types/global.d.ts
export {};
declare global {
  interface Window {
    $message?: ReturnType<typeof import('naive-ui')['useMessage']>
    $notification?: ReturnType<typeof import('naive-ui')['useNotification']>
  }
}