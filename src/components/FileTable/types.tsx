export type File = { 
name: string,
device: string,
path: string,
status: string
};

export type FileTableRowProps = {
    data: File,
    i: number,
    isAvailable: boolean,
    defaultSelect?: boolean,
    onClickRowHandler: (i: number, isSelected: boolean) =>  void
}

    
export  type FileTableProps = {
    data: File[]
}

export type SelectedFiles = {
    [key: number]: boolean
}
