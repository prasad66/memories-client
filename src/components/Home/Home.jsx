import React, { useState } from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux'
import { getPostsBySearch } from '../../actions/posts';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import Posts from './../Posts/Posts';
import Form from './../Form/Form';
import useStyles from './styles';
import Pagination from './../Pagination';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}


const Home = () => {

    const [currentId, setCurrentId] = useState(null);

    const [search, setSearch] = useState('');

    const [tags, setTags] = useState([]);

    const classes = useStyles();

    const dispatch = useDispatch();

    const query = useQuery();

    const history = useHistory();

    const page = query.get('page') || 1;

    const searchQuery = query.get('searchQuery');

    // useEffect(() => {
    //     dispatch(getPosts());
    // }, [currentId, dispatch]);


    const handleAdd = (tag) => setTags([...tags, tag]);

    const handleDelete = (tagtoDelete) => setTags(tags.filter(tag => tag !== tagtoDelete));

    const searchPost = (e) => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.map(tag => tag.toLowerCase()).join(',') }));
            history.push(`/posts/search?searchQuery=${search || 'none'}?tags=${tags.join(',')}`);

        } else {
            history.push(`/`);
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            searchPost();
        }

    };

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid className={classes.gridContainer} container justifyContent="space-between" alignItems='stretch' spacing={3} >
                    <Grid item xs={12} sm={6} md={9} >
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} >
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField name='search' variant='outlined' label='Search Memories' value={search} onChange={(e) => { setSearch(e.target.value) }} onKeyPress={handleKeyPress} fullWidth />
                            <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label='Search Tags'
                                variant="outlined"
                                fullWidth
                            />
                            <Button onClick={searchPost} variant='contained' className={classes.searchButton} color='primary' >Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                      
                      

                        <Paper className={classes.pagination} elevation={6} >
                            <Pagination page={page} />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow >
    )
}

export default Home