import * as React from 'react';
import {Paper} from "@mui/material";
import Restaurants from "./Restaurants";

const Medicine = () => {
    /*    const isAdmin = getRoleFromToken();
        const {data, refetch} = useGetAllMedicinesQuery();
        const [open, setOpen] = useState<boolean>(false)
        const [filterValue, setFilterValue] = useState<string>('');
        // Filter data based on the input value
        const filteredData = data?.filter(row =>
            row.name.toLowerCase().includes(filterValue.toLowerCase())
        );*/


    return <>
        <Paper sx={{marginTop: '1.5rem', padding: '1rem', background: "#FBEAE7"}}>
            <Restaurants/>
        </Paper>
        {/* <Paper sx={{marginTop: '1.5rem', padding: '1rem'}}>
            <Box sx={{display: 'flex', justifyContent: "space-between", marginBottom:'1rem'}}>
                {
                    isAdmin && <Button variant='contained' type='submit' onClick={() => setOpen(true)}>
                        <FormattedMessage id="medicine_createMedicine" />
                    </Button>
                }
                <TextField
                    label={<FormattedMessage id="medicine_filter" />}
                    variant="outlined"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                />
            </Box>
            {
                data && <MedicineTable refetch={refetch} data={filterValue ? filteredData : data}></MedicineTable>
            }
        </Paper>
        {open && <EditMedicineModal open={open} setOpen={setOpen} refetch={refetch}/>}*/}
    </>


};
export default Medicine;
