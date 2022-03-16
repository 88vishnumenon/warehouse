import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { TableData } from "../../types/types";
import { Theme } from '@mui/material';
import { makeStyles } from "@material-ui/styles";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';


const useStyles = makeStyles((theme: Theme) => ({
    tableHeader: {
       background:theme.palette.ikea.ikeaBlue,
    },
    tableHeaderCell:{
        color:"white"
    }
   
})
)

export interface WarehouseTableProps {
    headers: Array<string>
    data: Array<Array<TableData>>
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#0058A3",
        color: "white",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));


const WareHouseTable: React.FC<WarehouseTableProps> = (props) => {
     const { headers, data } = props;
     const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table aria-label="warehouse table" data-testid='table'>
                <TableHead>
                    <TableRow className={classes.tableHeader}>
                        {headers.map((value:string,index:number)=>{
                            return <StyledTableCell key={index}>{value}</StyledTableCell>
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
