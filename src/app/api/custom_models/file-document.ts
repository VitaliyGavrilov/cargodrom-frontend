
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

export interface RequestFile{
  component:string;
  file: File;
  file_info: {
    basename: string,
    extension: string,
    filename: number,
    filesize: number,
    type: string,
  }
  file_name: string;
  file_time: number;
  id: number;
  item_id: number;
  owner_id: number;
  path: string;
  time_add: string
  time_edit: string;
  user_id: number;
  var: string;
}
