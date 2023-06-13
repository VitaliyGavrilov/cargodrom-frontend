
export interface FileDocument {
  id: number;
  item_id: number;
  component: string;
  var: string;
  file: File;
  file_info: FileInfo;
  file_time: number;
  file_name: string;
  time_add: string;
  time_edit: string;
  owner_id: number;
  user_id: number;
  path: string;
}

export interface FileInfo {
  filesize: number;
  filename: number;
  extension: string;
}
