import React from "react";
import { TableData } from "../../types/types";
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export interface WarehouseTableProps {
    headers: Array<string>
    data: Array<Array<TableData>>
}




const WareHouseTable: React.FC<WarehouseTableProps> = (props) => {
     const { headers, data } = props;

    return (
        <TableContainer component={Paper}>
            <Table aria-label="warehouse table">
                <TableHead>
                    <TableRow>
                        {headers.map((value:string,index:number)=>{
                            return <TableCell key={index}>{value}</TableCell>
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((rows, index) => {
                        return (
                            <TableRow key={index} style={index % 2 ? { background: "#F6F6F6" } : { background: "white" }}>

                                {
                                    rows.map((row, index) => {
                                        return <TableCell key={index}>
                                            {row.value}
                                        </TableCell>
                                    })
                                }
                           </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default WareHouseTable;
