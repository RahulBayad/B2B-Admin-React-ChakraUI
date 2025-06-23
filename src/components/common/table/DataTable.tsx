import {
  Box,
  Button,
  Card,
  Checkbox,
  Input,
  InputGroup,
  Menu,
  Portal,
  Separator,
  Table,
} from "@chakra-ui/react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnPinningState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUpIcon,
  ColumnsIcon,
  EllipsisVertical,
  Import,
  ListFilter,
  PinIcon,
  Printer,
  Search,
} from "lucide-react";
import React, {
  useCallback,
  useState,
  type JSX,
  type ReactElement,
} from "react";

type DataTableProps = {
  data: unknown[];
  columns: unknown[];
  selectable?: boolean;
  FilterDialog?: JSX.Element;
  showToolbar?: boolean;
  enableFilter?: boolean;
  enableExport?: boolean;
  enableImport?: boolean;
  enableSearch?: boolean;
};

export type TableColumnDef<T> = ColumnDef<T> & {
  flex?: number;
  width?: number;
};

export const DataTable = ({
  data = [],
  columns,
  selectable = false,
  FilterDialog,
}: DataTableProps) => {
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: [],
    right: [],
  });
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    enableRowSelection: selectable,
    enablePinning: true,
    state: {
      rowSelection,
      pagination,
      columnPinning,
      columnVisibility,
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onColumnPinningChange: setColumnPinning,
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });

  const TableToolbar = useCallback(() => {

    return (
      <Box my={1} className="flex justify-end items-center gap-2 py-2 px-2">
       
        <InputGroup startElement={<Search style={{height: "15px", width: "15px"}}/>}>
          <Input placeholder="Search..." size="sm"/>
        </InputGroup>
        {/* <Button height="40px" width="40px" variant="ghost" rounded="full">
          <ColumnsIcon style={{ height: "16px", width: "16px" }} />
        </Button> */}
        
        {/* <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          className="mui-menu"
        >
          {table.getAllColumns().map((column, index: number) => (
            <MenuItem style={{ py: 1, px: 1, fontSize: 13 }} key={index}>
              <label htmlFor={`visibility-${column.id}`}>
                <Checkbox
                  id={`visibility-${column.id}`}
                  size="small"
                  style={{ p: 0, mr: 1 }}
                  checked={column.getIsVisible()}
                  disabled={!column.getCanHide()}
                  onChange={column.getToggleVisibilityHandler()}
                  disableRipple
                />
                {column.columnDef.header}
              </label>
            </MenuItem>
          ))}
        </Menu> */}
        <div className="flex">
          <Menu.Root closeOnSelect={false}>
            <Menu.Trigger asChild>
              <Button height="40px" width="40px" variant="ghost" rounded="full">
                <ColumnsIcon style={{ height: "16px", width: "16px" }} />
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.ItemGroup>
                    <Menu.ItemGroupLabel>Table Columns</Menu.ItemGroupLabel>
                    <Separator/>
                    <Menu.Item>
                      <Checkbox.Root
                        checked={table.getIsAllColumnsVisible()}
                        onChange={()=>table.toggleAllColumnsVisible()}
                        size="sm"
                      >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                        <Checkbox.Label>
                          All Columns
                        </Checkbox.Label>
                      </Checkbox.Root>
                    </Menu.Item>
                    {table.getAllColumns().map((column: ColumnDef, index: number) => (
                    <Menu.Item asChild key={index}>
                      <Checkbox.Root
                        id={`visibility-${column.id}`}
                        checked={column.getIsVisible()}
                        onChange={column.getToggleVisibilityHandler()}
                        size="sm"
                      >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                        <Checkbox.Label>
                          {column?.columnDef?.header}
                        </Checkbox.Label>
                      </Checkbox.Root>
                    </Menu.Item>
                  ))}
                  </Menu.ItemGroup>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
          <Button height="40px" width="40px" variant="ghost" rounded="full">
            <Import style={{ height: "16px", width: "16px" }} />
          </Button>
          <Button height="40px" width="40px" variant="ghost" rounded="full">
            <Printer style={{ height: "16px", width: "16px" }} />
          </Button>
        </div>
        {/* {
          FilterDialog && <FilterDialog />
        } */}
      </Box>
    );
  }, [columns]);

  // const TableHeaderMenu = useCallback(({ header }) => {
  //   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  //   const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  //   const handleClose = () => setAnchorEl(null);

  //   const handlePinLeft = () => {
  //     header.column.pin('left');
  //     handleClose();
  //   };
  //   const handlePinRight = () => {
  //     header.column.pin('right');
  //     handleClose();
  //   };
  //   const handleUnpin = () => {
  //     header.column.pin(false);
  //     handleClose();
  //   };

  //   const sortASC = (columnID: string) => {
  //     table.setSorting((prev) => {
  //       const filteredCols = prev.filter(col => col.id !== columnID)
  //       return [...filteredCols, { id: columnID, desc: false }]
  //     })
  //     handleClose()
  //   }
  //   const sortDESC = (columnID: string) => {
  //     table.setSorting((prev) => {
  //       const filteredCols = prev.filter(col => col.id !== columnID)
  //       return [...filteredCols, { id: columnID, desc: true }]
  //     })
  //     handleClose()
  //   }
  //   const unSort = (columnID: string) => {
  //     table.setSorting(prev => prev.filter(col => col.id !== columnID))
  //     handleClose()
  //   }

  //   return (
  //     <>
  //       <Button
  //         aria-controls={`pin-menu-${header.id}`}
  //         aria-haspopup="true"
  //         aria-expanded={Boolean(anchorEl)}
  //         onClick={handleOpen}
  //         style={{ minWidth: "auto", opacity: 1, p: 1, ":hover": { opacity: 1 } }}
  //       >
  //         <EllipsisVertical size={13} />
  //       </Button>
  //       <Menu
  //         anchorEl={anchorEl}
  //         open={Boolean(anchorEl)}
  //         onClose={handleClose}
  //         anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
  //         slotProps={{
  //           paper: {
  //             style: {
  //               borderRadius: "5px"
  //             }
  //           }
  //         }}
  //       >
  //         <ListItemButton onClick={() => sortASC(header.column.columnDef.accessorKey)}>
  //           <ListItemIcon style={{ width: "30px", minWidth: "auto" }}>
  //             <GridArrowUpwardIcon style={{ width: "19px", p: 0 }} />
  //           </ListItemIcon>
  //           <ListItemText primary="Sort ASC"></ListItemText>
  //         </ListItemButton>
  //         <ListItemButton onClick={() => sortDESC(header.column.columnDef.accessorKey)}>
  //           <ListItemIcon style={{ width: "30px", minWidth: "auto" }}>
  //             <GridArrowDownwardIcon style={{ width: "19px", p: 0 }} />
  //           </ListItemIcon>
  //           <ListItemText primary="Sort DESC"></ListItemText>
  //         </ListItemButton>
  //         <Divider />
  //         <ListItemButton onClick={handlePinLeft}>
  //           <ListItemIcon style={{ width: "30px", minWidth: "auto" }}><PushPinIcon style={{ width: "19px", p: 0, transform: "rotate(30deg)" }} /> </ListItemIcon>
  //           <ListItemText primary="Pin Left"></ListItemText>
  //         </ListItemButton>
  //         <ListItemButton onClick={handlePinRight}>
  //           <ListItemIcon style={{ width: "30px", minWidth: "auto" }}><PushPinIcon style={{ width: "19px", p: 0, transform: "rotate(-30deg)" }} /> </ListItemIcon>
  //           <ListItemText primary="Pin Right"></ListItemText>
  //         </ListItemButton>

  //       </Menu>
  //     </>
  //   );
  // }, []);

  return (
    <div style={{display: "grid"}}>
      <TableToolbar />
      <Box overflowX="auto">
        <Table.Root variant="outline" className="w-full whitespace-nowrap">
          <Table.Header>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id}>
                {selectable && (
                  <Table.ColumnHeader className="sticky left-0 z-10">
                    <Checkbox.Root
                      defaultChecked
                      checked={table.getIsAllRowsSelected()}
                      onChange={table.getToggleAllRowsSelectedHandler()}
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control />
                    </Checkbox.Root>
                  </Table.ColumnHeader>
                )}
                {headerGroup.headers.map((header) => (
                  <Table.ColumnHeader
                    key={header.id}
                    style={{
                      position: header.column.getIsPinned()
                        ? "sticky"
                        : "static",
                      left:
                        header.column.getIsPinned() === "left"
                          ? selectable
                            ? 54
                            : 0
                          : undefined,
                      right:
                        header.column.getIsPinned() === "right" ? 0 : undefined,
                      zIndex: 2,
                    }}
                  >
                    <div className="flex justify-between items-center pr-1 table-header">
                      <span className="flex gap-1 items-center">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        <Button
                          onClick={() =>
                            header.column.pin(
                              header.column.getIsPinned() ? false : "left"
                            )
                          }
                          style={{
                            minWidth: "auto",
                            p: 0,
                            height: "30px",
                            width: "30px",
                            borderRadius: "1000px",
                            display: header.column.getIsPinned()
                              ? "initial"
                              : "none",
                          }}
                        >
                          <PinIcon
                            style={{
                              width: "16px",
                              height: "16px",
                              color: "gray",
                              p: 0,
                              mr: 0,
                              minWidth: "auto",
                            }}
                          />
                        </Button>
                        {header.column.getIsSorted() === "asc" ? (
                          <Button
                            style={{
                              minWidth: "auto",
                              p: 0,
                              height: "30px",
                              width: "30px",
                              borderRadius: "1000px",
                            }}
                            // onClick={() => table.setSorting(prev => prev.filter(col => col.id !== header.column.columnDef?.accessorKey))}
                            onClick={() => header.column.toggleSorting()}
                          >
                            <ArrowUpIcon
                              style={{ width: "16px", p: 0, color: "gray" }}
                            />
                          </Button>
                        ) : header.column.getIsSorted() === "desc" ? (
                          <Button
                            style={{
                              minWidth: "auto",
                              p: 0,
                              height: "30px",
                              width: "30px",
                              borderRadius: "1000px",
                            }}
                            onClick={() => header.column.toggleSorting()}
                          >
                            <ArrowDown
                              style={{ width: "16px", p: 0, color: "gray" }}
                            />
                          </Button>
                        ) : (
                          ""
                        )}
                      </span>
                      {/* <TableHeaderMenu header={header} /> */}
                    </div>
                  </Table.ColumnHeader>
                ))}
              </Table.Row>
            ))}
          </Table.Header>
          <Table.Body>
            {table.getPaginationRowModel().rows.map((row) => (
              <Table.Row key={row.id}>
                {selectable && (
                  <Table.Cell className="sticky left-0 z-10 p-0">
                    <Checkbox.Root
                      defaultChecked
                      checked={row.getIsSelected()}
                      onChange={row.getToggleSelectedHandler()}
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control />
                    </Checkbox.Root>
                  </Table.Cell>
                )}
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell
                    key={cell.id}
                    style={{
                      position: cell.column.getIsPinned() ? "sticky" : "static",
                      left:
                        cell.column.getIsPinned() === "left"
                          ? selectable
                            ? 54
                            : 0
                          : undefined,
                      right:
                        cell.column.getIsPinned() === "right" ? 0 : undefined,
                      zIndex: 10,
                      fontSize: 13,
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </div>
  );
};
