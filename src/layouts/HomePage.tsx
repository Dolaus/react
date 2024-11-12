import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {Card, CardContent, Grid} from "@mui/material";
import PaginationFooter from "./PaginationFooter";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {useAppDispatch} from "../hooks/hooks";
import {fetchExhibits, setCurrentPageSlice} from "../store/slices/exhibitSlice";
import {deleteExhibition} from "../api/exhibitActions";
import {checkUser} from "../store/slices/userSlice";
import PostItem from "./PostItem";
import {IExhibition} from "../../interface/IExhibition";
import {io} from "socket.io-client";
import {toast} from "react-toastify";

const HomePage = () => {
    const dispatch = useAppDispatch();
    const exhibitsArray = useSelector((state: RootState) => state.exhibit.exhibitions);
    const totalPageFromExhibitSlice = useSelector((state: RootState) => state.exhibit.totalPage);
    const currentUser = useSelector((state: RootState) => state.user.username);
    const url = useSelector((state: RootState) => state.exhibit.url);

    const [exhibitions, setExhibitions] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedExhibitId, setSelectedExhibitId] = useState<number | null>(null);

    const setCurrentPageHandler = (currentPage: number) => {
        setCurrentPage(currentPage);
    }

    const SOCKET_SERVER_URL =process.env.REACT_APP_STATICURL +'/notifications';

    const socket = io(SOCKET_SERVER_URL, {
        transports: ['websocket'],
        autoConnect: true,
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: Infinity,
    });

    useEffect(() => {
        dispatch(checkUser());

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        setSelectedExhibitId(null);
        dispatch(fetchExhibits({currentPage: 1, url: url}));

        setExhibitions(exhibitsArray)
        setCurrentPage(1)
    }, [url]);

    useEffect(() => {
        setExhibitions(exhibitsArray)
        setTotalPage(totalPageFromExhibitSlice);
    }, [exhibitsArray]);

    useEffect(() => {
        dispatch(fetchExhibits({currentPage: currentPage, url: url}));
        setExhibitions(exhibitsArray)

        socket.on('newPost', (data) => {
            if (currentPage === 1) {
                dispatch(fetchExhibits({currentPage: currentPage, url: url}));
            }
            console.log(currentPage)
            toast(`New Post from ${data.user}`);
        });
    }, [currentPage]);

    const deleteExhibitHandler = async (id: number) => {
        await deleteExhibition(id);
        dispatch(fetchExhibits({currentPage: currentPage, url: url}));
    }

    const toggleComments = (id: number) => {
        setSelectedExhibitId(selectedExhibitId === id ? null : id);
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={2} sx={{px: 10, py: 1}}>
                {exhibitions.length > 0 ? (
                    exhibitions.map((exhibition: IExhibition, index: number) => (
                        <PostItem deleteExhibitHandler={deleteExhibitHandler} exhibition={exhibition} key={index}
                                  index={index} toggleComments={toggleComments} selectedExhibitId={selectedExhibitId}
                                  currentUser={currentUser}/>
                    ))
                ) : (
                    <p>No exhibitions found</p>
                )}
            </Grid>
            {totalPage > 1 ? <PaginationFooter lastPage={totalPage} currentPageHandler={setCurrentPageHandler}
                                               currentPage={currentPage}/> : ''}
        </Box>
    );
};

export default HomePage;
