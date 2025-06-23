import React, { useState, type JSX, type ReactElement } from 'react'
import { DataTable, type TableColumnDef } from '../../../components/common/table/DataTable'
import { Link } from 'react-router';
import { Button } from '@chakra-ui/react';

type CompanyTable = {
  id?: string | number;
  name: string;
  gst?: string;
  pan?: string;
  owner?: string;
  email: string;
  mobile: string;
}

const companyTableData: CompanyTable[] = [
  {
    id: 1,
    name: "ABC Enterprise",
    gst: "231HKV0482KD",
    pan: "HKV0482KD",
    owner: "Ben Stokes",
    email: "benstokes123@gmail.com",
    mobile: "+41 8694562165"
  },
  {
    id: 2,
    name: "DEF Enterprise",
    gst: "231HKV0482KD",
    pan: "HKV0482KD",
    owner: "Ben Stokes",
    email: "benstokes123@gmail.com",
    mobile: "+41 8694562165"
  },
  {
    id: 1,
    name: "TKA Enterprise",
    gst: "231HKV0482KD",
    pan: "HKV0482KD",
    owner: "Ben Stokes",
    email: "benstokes123@gmail.com",
    mobile: "+41 8694562165"
  },
  {
    id: 4,
    name: "JKL Enterprise",
    gst: "231HKV0482KD",
    pan: "HKV0482KD",
    owner: "Ben Stokes",
    email: "benstokes123@gmail.com",
    mobile: "+41 8694562165"
  },
  {
    id: 5,
    name: "MNO Enterprise",
    gst: "231HKV0482KD",
    pan: "HKV0482KD",
    owner: "Ben Stokes",
    email: "benstokes123@gmail.com",
    mobile: "+41 8694562165"
  },
]

const columns: TableColumnDef<CompanyTable>[] = [
  { accessorKey: "name", header: "Company", width: 150, },
  // {accessorKey : "id", header: "Company ID", width: 150,},
  {
    accessorKey: "gst",
    header: "Legal", width: 150,
    cell: (params) => (
      <div className='flex flex-col'>
        <span><b>GST: </b>{params.row.original.gst}</span>
        <span><b>PAN: </b>{params.row.original.pan}</span>
      </div>
    )
  },
  { accessorKey: "owner", header: "Owner Name", width: 150, },
  { accessorKey: "email", header: "Email", width: 150, },
  { accessorKey: "mobile", header: "Contact", width: 150, },
]

const Company = () => {
  return (
    <React.Fragment>
      <div className='flex justify-between items-center mb-2'>
        <h1>Company</h1>
        {/* <Button><Link to={"/business-entities/companies/create"}>Add New</Link></Button> */}
        <Button><Link to={"#"}>Add New</Link></Button>
      </div>
      <DataTable
        columns={columns}
        data={companyTableData}
        selectable
      />
    </React.Fragment>
  )
}

export default Company