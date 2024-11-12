import React from 'react';
import Box from "@mui/material/Box";
import {Pagination} from "@mui/material";

interface PaginationFooterProps {
    lastPage: number;
    currentPageHandler: (currentPage: number) => void;
    currentPage: number;
}

const PaginationFooter: React.FC<PaginationFooterProps> = ({lastPage, currentPageHandler, currentPage}) => {

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        currentPageHandler(value);
        window.scrollTo(0, 0);
    };

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: 'darkgray',
                color: 'white',
                p: 2,
                textAlign: 'center'
            }}
        >
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Pagination count={lastPage} page={currentPage} onChange={handleChange}/>
            </Box>
        </Box>
    );
};

export default PaginationFooter;