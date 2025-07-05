import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  CloseButton,
  Dialog,
  Field,
  FileUpload,
  IconButton,
  Input,
  InputGroup,
  Menu,
  NativeSelect,
  Pagination,
  Portal,
  Separator,
  Table,
  Text,
  Textarea,
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
  ArrowUp,
  ArrowUpIcon,
  ColumnsIcon,
  CornerUpLeft,
  CornerUpRight,
  EllipsisVerticalIcon,
  Import,
  PinIcon,
  Printer,
  RotateCcw,
  Search,
} from "lucide-react";
import React, { useCallback, useState, type JSX } from "react";
import { LuChevronLeft, LuChevronRight, LuFileUp } from "react-icons/lu";

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
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
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
      <Box
        mt={3}
        mb={2}
        className="flex justify-end items-center gap-2 py-2 px-2"
      >
        <InputGroup
          startElement={<Search style={{ height: "15px", width: "15px" }} />}
        >
          <Input placeholder="Search..." size="sm" />
        </InputGroup>

        <Box className="flex gap-1">
          <Menu.Root closeOnSelect={false}>
            <Menu.Trigger asChild>
              <Button
                variant="outline"
                rounded="md"
                size="sm"
                aspectRatio="square"
              >
                <ColumnsIcon style={{ height: "16px", width: "16px" }} />
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner width={200}>
                <Menu.Content>
                  <Menu.ItemGroup>
                    <Menu.ItemGroupLabel>Table Columns</Menu.ItemGroupLabel>
                    <Separator />
                    <Menu.Item>
                      <Checkbox.Root
                        checked={table.getIsAllColumnsVisible()}
                        onCheckedChange={table.getToggleAllColumnsVisibilityHandler()}
                        size="sm"
                      >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                        <Checkbox.Label>All Columns</Checkbox.Label>
                      </Checkbox.Root>
                    </Menu.Item>
                    {table.getAllColumns().map((column, index: number) => (
                      <Menu.Item asChild key={index}>
                        <Checkbox.Root
                          id={`visibility-${column.id}`}
                          checked={column.getIsVisible()}
                          onCheckedChange={() => column.toggleVisibility()}
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

          {/* Import  */}
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button
                variant="outline"
                rounded="md"
                size="sm"
                aspectRatio="square"
              >
                <Import style={{ height: "16px", width: "16px" }} />
              </Button>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content maxWidth={450}>
                  <Dialog.Header>
                    <Dialog.Title fontSize="xl">Reason For Import</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                    <form>
                      <Field.Root>
                        <Field.Label fontWeight="normal">
                          Insert File
                        </Field.Label>
                        <FileUpload.Root gap="1">
                          <FileUpload.HiddenInput />
                          <InputGroup
                            startElement={<LuFileUp />}
                            endElement={
                              <FileUpload.ClearTrigger asChild>
                                <CloseButton
                                  me="-1"
                                  size="xs"
                                  variant="plain"
                                  focusVisibleRing="inside"
                                  focusRingWidth="2px"
                                  pointerEvents="auto"
                                />
                              </FileUpload.ClearTrigger>
                            }
                          >
                            <Input asChild>
                              <FileUpload.Trigger>
                                <FileUpload.FileText lineClamp={1} />
                              </FileUpload.Trigger>
                            </Input>
                          </InputGroup>
                        </FileUpload.Root>
                      </Field.Root>
                      <br />
                      <Field.Root>
                        <Field.Label fontWeight="normal">
                          Please provide a valid reason for importing this data:
                        </Field.Label>
                        <Textarea
                          placeholder="Enter Reason..."
                          rows={3}
                        ></Textarea>
                      </Field.Root>
                    </form>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button width="full">Import</Button>
                    </Dialog.ActionTrigger>
                  </Dialog.Footer>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>

          {/* Export */}
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button
                variant="outline"
                rounded="md"
                size="sm"
                aspectRatio="square"
              >
                <Printer style={{ height: "16px", width: "16px" }} />
              </Button>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content maxWidth={400}>
                  <Dialog.Header>
                    <Dialog.Title fontSize="xl">Reason For Export</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                    <Field.Root>
                      <p>
                        Please provide a valid reason for exporting this data:
                      </p>
                      <Textarea
                        placeholder="Enter Reason..."
                        rows={4}
                      ></Textarea>
                    </Field.Root>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button width="full">Export</Button>
                    </Dialog.ActionTrigger>
                  </Dialog.Footer>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
        </Box>
        {FilterDialog && <FilterDialog />}
      </Box>
    );
  }, [columns]);

  const TableHeaderMenu = React.memo(({ header, table }) => {
    return (
      <>
        <Menu.Root>
          <Menu.Trigger asChild>
            <IconButton
              minWidth="auto"
              width="30px"
              height="30px"
              rounded="full"
              variant="subtle"
              className="tableMenuBtn"
            >
              <EllipsisVerticalIcon style={{ height: "14px", width: "14px" }} />
            </IconButton>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item
                  value="1"
                  onClick={() => table.setSorting([{ id: header.column.columnDef.accessorKey, desc: false }])}
                >
                  <ArrowUp className="h-4 w-4" /> Sort ASC
                </Menu.Item>
                <Menu.Item
                  value="2"
                  onClick={() => table.setSorting([{ id: header.column.columnDef.accessorKey, desc: true }])}
                >
                  <ArrowDown className="h-4 w-4" /> Sort DESC
                </Menu.Item>
                <Menu.Item value="3" onClick={()=> header.column.pin("left")}>
                  <CornerUpLeft className="h-4 w-4" /> Pin to Left
                </Menu.Item>
                <Menu.Item value="4" onClick={()=> header.column.pin("right")}>
                  <CornerUpRight className="h-4 w-4" /> Pin to Right
                </Menu.Item>
                <Menu.Item value="5" onClick={()=> header.column.pin(false)}>
                  <RotateCcw className="h-4 w-4" /> Unpin
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </>
    );
  });

  return (
    <div style={{ display: "grid" }}>
      <TableToolbar />
      <Box overflowX="auto">
        <Table.Root
          bgColor={{ base: "white", _dark: "blackAlpha.300" }}
          variant="outline"
          className="w-full whitespace-nowrap"
          borderWidth="1px"
        >
          <Table.Header>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id}>
                {selectable && (
                  <Table.ColumnHeader className="sticky left-0 z-10">
                    <Checkbox.Root
                      checked={!!table.getIsAllRowsSelected()}
                      onCheckedChange={() => table.toggleAllRowsSelected()}
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control />
                    </Checkbox.Root>
                  </Table.ColumnHeader>
                )}
                {headerGroup.headers.map((header) => (
                  <Table.ColumnHeader
                    className="datatableColumnHeader"
                    key={header.id}
                    // Setting position if column is pinned
                    position={header.column.getIsPinned() ? "sticky" : "static"}
                    left={
                      header.column.getIsPinned() === "left"
                        ? selectable
                          ? 54
                          : 0
                        : undefined
                    }
                    right={
                      header.column.getIsPinned() === "right" ? 0 : undefined
                    }
                    fontSize={13}
                    zIndex={2}
                  >
                    <div className="flex justify-between items-center pr-1 table-header">
                      <span className="flex gap-1 items-center">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {/* Pin icon */}
                        <IconButton
                          onClick={() =>
                            header.column.pin(
                              header.column.getIsPinned() ? false : "left"
                            )
                          }
                          display={
                            header.column.getIsPinned() ? "flex" : "none"
                          }
                          minWidth="auto"
                          width="30px"
                          height="30px"
                          rounded="full"
                          variant="subtle"
                        >
                          <PinIcon style={{ width: "14px", height: "14px" }} />
                        </IconButton>

                        {header.column.getIsSorted() === "asc" ? (
                          <IconButton
                            onClick={() => header.column.toggleSorting()}
                            minWidth="auto"
                            width="30px"
                            height="30px"
                            rounded="full"
                            variant="subtle"
                          >
                            <ArrowUpIcon
                              style={{ width: "14px", height: "14px" }}
                            />
                          </IconButton>
                        ) : header.column.getIsSorted() === "desc" ? (
                          <IconButton
                            onClick={() => header.column.toggleSorting()}
                            minWidth="auto"
                            width="30px"
                            height="30px"
                            rounded="full"
                            variant="subtle"
                          >
                            <ArrowDown
                              style={{ width: "14px", height: "14px" }}
                            />
                          </IconButton>
                        ) : (
                          ""
                        )}
                      </span>
                      <TableHeaderMenu header={header} table={table}/>
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
                      checked={!!row.getIsSelected()}
                      onCheckedChange={() => row.toggleSelected()}
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control />
                    </Checkbox.Root>
                  </Table.Cell>
                )}
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell
                    key={cell.id}
                    position={cell.column.getIsPinned() ? "sticky" : "static"}
                    left={
                      cell.column.getIsPinned() === "left"
                        ? selectable
                          ? 54
                          : 0
                        : undefined
                    }
                    right={
                      cell.column.getIsPinned() === "right" ? 0 : undefined
                    }
                    zIndex={10}
                    fontSize={12}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
      <Pagination.Root
        count={data.length}
        pageSize={pagination.pageSize}
        defaultPage={1}
        mt={3}
        display="flex"
        justifyContent="space-between"
        fontSize={13}
      >
        <Box display="flex" flexWrap="nowrap" alignItems="center" gap={2}>
          <Text textWrap="nowrap">Page size</Text>
          <NativeSelect.Root
            onChange={(e) => {
              table.setPageSize(e.target?.value);
            }}
            size="sm"
            fontSize={13}
          >
            <NativeSelect.Field>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Box>
        <ButtonGroup variant="ghost" size="sm">
          <Pagination.PrevTrigger asChild>
            <IconButton>
              <LuChevronLeft />
            </IconButton>
          </Pagination.PrevTrigger>

          <Pagination.Items
            render={(page) => (
              <IconButton
                variant={{ base: "ghost", _selected: "outline" }}
                onClick={() => table.setPageIndex(page.value - 1)}
              >
                {page.value}
              </IconButton>
            )}
          />

          <Pagination.NextTrigger asChild>
            <IconButton>
              <LuChevronRight />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </div>
  );
};
