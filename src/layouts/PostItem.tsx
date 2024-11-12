import React from 'react';
import {Card, CardContent, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CommentPage from "./CommentPage";
import {IExhibition} from "../../interface/IExhibition";

interface IPostItemProps {
    exhibition: IExhibition
    index: number
    toggleComments: (id: number) => void
    currentUser: string
    deleteExhibitHandler: (id: number) => void,
    selectedExhibitId: number | null
}

const PostItem: React.FC<IPostItemProps> = ({
                                                exhibition,
                                                index,
                                                toggleComments,
                                                currentUser,
                                                selectedExhibitId,
                                                deleteExhibitHandler
                                            }) => {
    return (
        <Grid item xs={12} sm={12} md={12} key={index} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
        }}>
            <Card style={{width: '100%', maxWidth: '700px'}}>
                <CardContent>
                    <CardContent sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                    }}>
                        <img src={process.env.REACT_APP_STATICURL + exhibition.imageUrl}
                             style={{width: '100%', maxWidth: '200px'}}/>
                    </CardContent>
                    <Typography variant="body2">
                        {exhibition.description}
                    </Typography>
                    <Button onClick={() => toggleComments(exhibition.id)}>
                        Comments
                    </Button>
                    {currentUser === exhibition.user.username ?
                        <Button onClick={() => deleteExhibitHandler(exhibition.id)}>

                            Delete
                        </Button> : ""}
                </CardContent>
                {selectedExhibitId === exhibition.id && <CommentPage id={exhibition.id}/>}

            </Card>
        </Grid>
    );
};

export default PostItem;