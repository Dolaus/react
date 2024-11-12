import React, {useState} from 'react';
import {Box, Button, TextField, Typography} from '@mui/material';
import {uploadExhibition} from "../api/exhibitActions";
import {useNavigate} from "react-router-dom";
import {setUrl} from "../store/slices/exhibitSlice";
import {urlToRout} from "../utils/url";
import {useAppDispatch} from "../hooks/hooks";

const NewPostPage = () => {
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setImage(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (image && description) {
            await uploadExhibition(image, description);
            navigate('/')
            dispatch(setUrl({url: urlToRout.MY_EXHIBIT_URL}))
        } else {
            alert('Please upload an image and add a description.');
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                maxWidth: 500,
                mx: 'auto',
                mt: 5
            }}
        >
            <Typography variant="h5" component="h1" sx={{mb: 2}}>
                Створити новий пост
            </Typography>

            <TextField
                label="Опис"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={description}
                onChange={handleDescriptionChange}
            />

            <Button
                variant="contained"
                component="label"
                sx={{width: '100%'}}
            >
                Завантажити зображення
                <input type="file" hidden onChange={handleImageChange} accept="image/*"/>
            </Button>

            {image && (
                <Typography variant="body2" color="text.secondary">
                    Обране зображення: {image.name}
                </Typography>
            )}

            <Button type="submit" variant="contained" color="primary" fullWidth>
                Створити пост
            </Button>
        </Box>
    );
};

export default NewPostPage;
