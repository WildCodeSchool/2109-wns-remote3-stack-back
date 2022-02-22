export type ICreateNotificationType = {
  editorName: string;
  editorId: string;
  actionType: 'ADDED' | 'EDITED' | 'DELETED';
  modifiedObjectName: string;
  modifiedObjectId: string;
  onName?: string | undefined;
  onId?: string | undefined;
  type: 'COMMENT' | 'TASK' | 'PROJECT';
}
